import React, { lazy, Suspense, useSyncExternalStore } from 'react';
import App from './App';

const JournalAdmin = lazy(() => import('./components/JournalAdmin'));
const subscribe = (callback) => {
  window.addEventListener('hashchange', callback);
  window.addEventListener('popstate', callback);
  return () => {
    window.removeEventListener('hashchange', callback);
    window.removeEventListener('popstate', callback);
  };
};

export default function AppRouter() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash);
  return hash === '#admin'
    ? <Suspense fallback={<div className="admin-loading" role="status">Opening your journal studio…</div>}><JournalAdmin /></Suspense>
    : <App />;
}
