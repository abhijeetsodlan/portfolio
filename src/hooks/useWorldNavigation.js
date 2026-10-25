import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const isJournal = () => window.location.hash === '#beyond';
export function useWorldNavigation() {
  const [beyond, setBeyond] = useState(isJournal);
  const [transition, setTransition] = useState(null);
  const busy = useRef(false);
  const timers = useRef([]);
  const portfolioScroll = useRef(0);
  const savedTitle = useRef(document.title);
  const current = useRef(beyond);

  const travel = useCallback((next, updateHistory = true) => {
    if (busy.current || next === current.current) return;
    busy.current = true;
    if (!current.current) portfolioScroll.current = window.scrollY;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const midpoint = reduced ? 120 : 700;
    setTransition(next ? 'enter' : 'leave');
    timers.current.push(setTimeout(() => {
      if (updateHistory) window.history.pushState(null, '', next ? '#beyond' : window.location.pathname + window.location.search);
      current.current = next;
      setBeyond(next);
      document.title = next ? 'Beyond the screen | Abhijeet Sodlan' : savedTitle.current;
    }, midpoint));
    timers.current.push(setTimeout(() => {
      busy.current = false;
      setTransition(null);
      if (!next) document.getElementById('world-toggle')?.focus({ preventScroll: true });
      // Catch history navigation performed while the transition was in flight.
      if (isJournal() !== current.current) travel(isJournal(), false);
    }, reduced ? 280 : 1500));
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: beyond ? 0 : portfolioScroll.current, behavior: 'instant' });
  }, [beyond]);

  useEffect(() => {
    const pendingTimers = timers.current;
    if (current.current) document.title = 'Beyond the screen | Abhijeet Sodlan';
    const handleNavigation = () => travel(isJournal(), false);
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      pendingTimers.forEach(clearTimeout);
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [travel]);
  useEffect(() => {
    if (!transition) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, [transition]);
  return { beyond, transition, travel };
}
