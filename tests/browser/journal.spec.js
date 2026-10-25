import { test, expect } from '@playwright/test';
import path from 'node:path';
import { Buffer } from 'node:buffer';
import { readFileSync } from 'node:fs';

const userId = 'd2a5b3ca-183c-40b4-9e4c-f97f5f167a50';
const photo = path.resolve('public/images/tractor.jpg');
const user = { id: userId, email: 'admin@example.test', aud: 'authenticated', role: 'authenticated', app_metadata: { provider: 'email', providers: ['email'] }, user_metadata: {} };
const token = `${Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')}.${Buffer.from(JSON.stringify({ sub: userId, role: 'authenticated', exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.testsignature`;

async function mockBackend(page, options = {}) {
  const state = { entries: [], uploaded: [], removed: [], failSave: false, failCleanup: false, ...options };
  const headers = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET,POST,PATCH,DELETE,OPTIONS' };
  const json = (route, body, status = 200) => route.fulfill({ status, headers, contentType: 'application/json', body: JSON.stringify(body) });
  await page.route('**/auth/v1/**', async (route) => {
    if (route.request().method() === 'OPTIONS') return json(route, {});
    if (route.request().url().includes('/token')) {
      if (route.request().postDataJSON().password !== 'test-password') return json(route, { msg: 'Invalid login credentials', error_code: 'invalid_credentials' }, 400);
      return json(route, { access_token: token, refresh_token: 'test-refresh-token', token_type: 'bearer', expires_in: 3600, user });
    }
    if (route.request().url().includes('/user')) return json(route, user);
    return json(route, {});
  });
  await page.route('**/rest/v1/**', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (request.method() === 'OPTIONS') return json(route, {});
    if (url.pathname.endsWith('/rpc/is_journal_admin')) return json(route, state.denied ? false : true);
    if (request.method() === 'GET') {
      if (url.searchParams.get('select') === 'image_path') return json(route, state.entries.map(({ image_path }) => ({ image_path })));
      const publishedOnly = url.searchParams.get('is_published') === 'eq.true';
      state.lastPublicFilter = publishedOnly;
      return json(route, state.entries.filter((entry) => !publishedOnly || entry.is_published));
    }
    if (request.method() === 'POST' || request.method() === 'PATCH') {
      if (state.failSave) return json(route, { message: 'Database temporarily unavailable', code: 'TEST_ERROR' }, 503);
      const payload = request.postDataJSON();
      const id = url.searchParams.get('id')?.replace('eq.', '') || crypto.randomUUID();
      const entry = { ...payload, id, created_at: new Date().toISOString(), updated_at: new Date(Date.now() + state.entries.length + 1).toISOString() };
      state.entries = [...state.entries.filter((item) => item.id !== id), entry];
      return json(route, entry);
    }
    if (request.method() === 'DELETE') {
      const id = url.searchParams.get('id').replace('eq.', '');
      state.entries = state.entries.filter((entry) => entry.id !== id);
      return json(route, [{ id }]);
    }
    return json(route, {});
  });
  await page.route('**/storage/v1/**', async (route) => {
    const request = route.request();
    if (request.method() === 'OPTIONS') return json(route, {});
    if (request.method() === 'GET') {
      if (state.variedPhotos) {
        const index = Number(request.url().match(/gallery-(\d+)/)?.[1] || 0);
        const height = [680, 460, 820, 560, 730][index % 5];
        const image = readFileSync(photo).toString('base64');
        return route.fulfill({ headers, contentType: 'image/svg+xml', body: `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="${height}"><image href="data:image/jpeg;base64,${image}" width="500" height="${height}" preserveAspectRatio="xMidYMid slice"/></svg>` });
      }
      return route.fulfill({ path: photo, headers, contentType: 'image/jpeg' });
    }
    if (request.method() === 'DELETE') {
      if (state.failCleanup) return json(route, { message: 'Storage unavailable' }, 503);
      state.removed.push(...request.postDataJSON().prefixes);
      return json(route, []);
    }
    state.uploaded.push(new URL(request.url()).pathname.split('/object/beyond-screen/')[1]);
    return json(route, { Key: 'uploaded-image', Id: crypto.randomUUID() });
  });
  return state;
}

async function login(page) {
  await page.goto('/#admin');
  await page.getByLabel('Email address').fill('admin@example.test');
  await page.getByLabel('Password', { exact: true }).fill('test-password');
  await page.getByRole('button', { name: 'Open journal studio' }).click();
}

async function fillMoment(page, title = 'An evening outside') {
  await page.getByRole('button', { name: 'New moment', exact: true }).click();
  await page.getByLabel('Upload photo', { exact: true }).setInputFiles(photo);
  await page.getByLabel('Title', { exact: true }).fill(title);
  await page.getByText('More details', { exact: false }).click();
  await page.getByLabel('Image description').fill('A red tractor in the fields at sunset');
  await page.getByLabel('Caption', { exact: true }).fill('A little less online. A little more outside.');
  await expect(page.locator('.studio-preview > img')).toBeVisible();
  await expect.poll(() => page.locator('.studio-preview > img').evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
}

test('sign-in errors and non-admin accounts cannot access the photo library', async ({ page }) => {
  await mockBackend(page, { denied: true });
  await page.goto('/#admin');
  await page.getByLabel('Email address').fill('admin@example.test');
  await page.getByLabel('Password', { exact: true }).fill('wrong');
  await page.getByRole('button', { name: 'Open journal studio' }).click();
  await expect(page.getByRole('alert')).toContainText('Invalid login credentials');
  await page.getByLabel('Password', { exact: true }).fill('test-password');
  await page.getByRole('button', { name: 'Open journal studio' }).click();
  await expect(page.getByRole('heading', { name: 'This journal is invite-only.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'New moment', exact: true })).toHaveCount(0);
});

test('upload draft, review, publish, replace photo, and delete with cleanup', async ({ page }) => {
  const state = await mockBackend(page);
  const runtimeErrors = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  await login(page);
  await fillMoment(page);
  await page.screenshot({ path: 'test-results/admin-desktop.png', fullPage: true });
  await page.getByRole('button', { name: 'Save draft', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Draft saved');
  expect(state.entries[0].is_published).toBe(false);
  await page.getByRole('button', { name: 'Review & edit' }).click();
  await page.getByLabel('Publish to the journal').check();
  await page.getByRole('button', { name: 'Save & publish', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('published');
  await page.getByRole('link', { name: 'Visit the journal' }).click();
  await expect(page.getByRole('heading', { name: 'An evening outside' })).toBeVisible();
  expect(state.lastPublicFilter).toBe(true);
  await page.getByRole('button', { name: 'View photo: An evening outside' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: 'Manage journal' }).click();
  await page.getByRole('button', { name: 'Review & edit' }).click();
  await page.getByLabel('Replace photo', { exact: true }).setInputFiles(photo);
  await expect.poll(() => page.locator('.studio-preview > img').evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.getByLabel('Title', { exact: true }).fill('A new evening');
  await page.getByRole('button', { name: 'Save & publish', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('published');
  await expect.poll(() => state.removed.length).toBe(1);
  await page.getByRole('button', { name: 'Delete A new evening', exact: true }).click();
  await page.getByRole('button', { name: 'Delete permanently' }).click();
  await expect(page.getByRole('status')).toContainText('Moment deleted');
  await expect.poll(() => state.removed.length).toBe(2);
  expect(state.entries).toHaveLength(0);
  expect(runtimeErrors).toEqual([]);
});

test('failed database writes preserve editor, and orphan cleanup is retryable', async ({ page }) => {
  const state = await mockBackend(page, { failSave: true });
  await login(page); await fillMoment(page);
  await page.getByRole('button', { name: 'Save draft', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Database temporarily unavailable');
  await expect(page.getByLabel('Title', { exact: true })).toHaveValue('An evening outside');
  expect(state.entries).toHaveLength(0);
  await page.getByRole('button', { name: 'Retry cleanup' }).click();
  await expect.poll(() => state.removed.length).toBe(1);
  state.failSave = false;
  await page.getByRole('button', { name: 'Save draft', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Draft saved');
  state.failCleanup = true;
  await page.getByRole('button', { name: 'Delete An evening outside', exact: true }).click();
  await page.getByRole('button', { name: 'Delete permanently' }).click();
  await expect(page.getByRole('alert')).toContainText('photo still needs cleanup');
  state.failCleanup = false;
  await page.getByRole('button', { name: 'Retry cleanup' }).click();
  await expect(page.getByRole('status')).toContainText('cleanup complete');
});

test('mobile editor fits the viewport and drafts do not appear in the public journal', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const state = await mockBackend(page);
  await login(page); await fillMoment(page, 'A private draft');
  await page.screenshot({ path: 'test-results/admin-mobile.png', fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Save draft', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Draft saved');
  await page.getByRole('link', { name: 'Visit the journal' }).click();
  await expect(page.getByText('A few moments are on their way. Come back soon.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'A private draft' })).toHaveCount(0);
  expect(state.lastPublicFilter).toBe(true);
});

test('a photo can be published, reviewed, and deleted without any text', async ({ page }) => {
  const state = await mockBackend(page);
  await login(page);
  await page.getByRole('button', { name: 'New moment', exact: true }).click();
  await page.getByLabel('Upload photo', { exact: true }).setInputFiles(photo);
  await expect.poll(() => page.locator('.studio-preview > img').evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.getByLabel('Publish to the journal').check();
  await page.getByRole('button', { name: 'Save & publish', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('published');
  expect(state.entries[0]).toMatchObject({ title: '', note: '', alt: '', category: '', image_width: 960, image_height: 1280 });
  await page.getByRole('link', { name: 'Visit the journal' }).click();
  await page.getByRole('button', { name: 'View photo: Untitled photo' }).click();
  await expect(page.getByRole('dialog', { name: 'Untitled photo' })).toBeVisible();
  await expect(page.locator('.viewer-caption')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: 'Manage journal' }).click();
  await page.getByRole('button', { name: 'Delete Untitled photo' }).click();
  await page.getByRole('button', { name: 'Delete permanently' }).click();
  await expect(page.getByRole('status')).toContainText('Moment deleted');
});

test('masonry shows two columns on mobile and preserves natural photo proportions', async ({ page }) => {
  const entries = Array.from({ length: 12 }, (_, index) => ({
    id: `gallery-${index}`, image_path: `gallery-${index}.jpg`, title: index % 3 ? '' : `Outside, ${index + 1}`,
    alt: '', note: '', category: index % 2 ? 'Reading' : 'Farm life', is_published: true,
    image_width: 960, image_height: 1280, sort_order: index,
  }));
  await mockBackend(page, { entries, variedPhotos: true });
  await page.goto('/#beyond');
  await expect(page.locator('.gallery-pin')).toHaveCount(12);
  await expect.poll(() => page.locator('.gallery-photo img').evaluateAll((images) => images.filter((img) => img.complete && img.naturalWidth > 0).length)).toBe(12);
  await page.screenshot({ path: 'test-results/gallery-desktop.png', fullPage: true, animations: 'disabled' });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.gallery-masonry')).toHaveCSS('column-count', '2');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const dimensions = await page.locator('.gallery-photo img').first().evaluate((img) => ({ width: img.clientWidth, height: img.clientHeight, naturalRatio: img.naturalWidth / img.naturalHeight }));
  expect(dimensions.width / dimensions.height).toBeCloseTo(dimensions.naturalRatio, 2);
  await page.screenshot({ path: 'test-results/gallery-mobile.png', fullPage: true, animations: 'disabled' });
  await page.getByRole('button', { name: 'Reading', exact: true }).click();
  await expect(page.locator('.gallery-pin')).toHaveCount(6);
  await page.getByRole('button', { name: 'View photo: Untitled photo' }).first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
