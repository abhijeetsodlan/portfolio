import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  timeout: 30000,
  fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:4177', channel: 'chrome', headless: true },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4177 --strictPort',
    url: 'http://127.0.0.1:4177', reuseExistingServer: false,
    env: { VITE_SUPABASE_URL: 'https://journal-test.supabase.co', VITE_SUPABASE_ANON_KEY: 'sb_publishable_browser_test_only' },
  },
});
