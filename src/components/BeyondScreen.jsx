import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaExpand, FaXmark } from 'react-icons/fa6';
import { journalEntries } from '../data/journal';
import { supabase } from '../lib/supabase';
import { createJournalApi } from '../lib/journalApi';
import './BeyondScreen.css';
import './PhotoGallery.css';

const categories = ['All moments', 'Farm life', 'Reading', 'Small moments'];
const photoName = (entry) => entry.title?.trim() || entry.alt?.trim() || 'Untitled photo';

function PhotoViewer({ entry, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.showModal();
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);
  const hasDetails = entry.title || entry.note || entry.label || entry.taken_at;
  return <dialog ref={dialog} className="journal-viewer" aria-label={photoName(entry)} onCancel={onClose}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <button className="viewer-close" onClick={onClose} aria-label="Close photo" autoFocus><FaXmark /></button>
    <img src={entry.image} alt={entry.alt || entry.title || 'A photo from Abhijeet’s journal'} />
    {hasDetails && <div className="viewer-caption">
      {(entry.label || entry.taken_at) && <p className="viewer-label">{entry.label}{entry.label && entry.taken_at ? ' · ' : ''}{entry.taken_at && <time dateTime={entry.taken_at}>{new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${entry.taken_at}T00:00:00`))}</time>}</p>}
      {entry.title && <h2>{entry.title}</h2>}{entry.note && <p>{entry.note}</p>}
    </div>}
  </dialog>;
}

export default function BeyondScreen({ onReturn }) {
  const [category, setCategory] = useState('All moments');
  const [selected, setSelected] = useState(null);
  const [moments, setMoments] = useState(supabase ? [] : journalEntries);
  const [loading, setLoading] = useState(!!supabase);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => {
    if (!supabase) return;
    const controller = new AbortController();
    setLoading(true); setError('');
    createJournalApi(supabase).list(true, controller.signal).then((data) => {
      if (!controller.signal.aborted) setMoments(data);
    }).catch(() => { if (!controller.signal.aborted) setError('The journal could not be loaded. Please try again.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);
  const entries = moments.filter((entry) => category === 'All moments' || entry.category === category);
  return <main className="journal-world journal-gallery">
    <div className="journal-shell">
      <nav className="gallery-nav" aria-label="Journal navigation"><button className="journal-back" onClick={onReturn}><FaArrowLeft /><span>Portfolio</span></button></nav>
     
      {loading && <div className="gallery-skeleton" role="status" aria-label="Loading photos">{Array.from({ length: 10 }, (_, index) => <div key={index} style={{ aspectRatio: [0.72, 1, 0.65, 1.2, 0.85][index % 5] }} />)}</div>}
      {error && <div className="journal-feedback" role="alert"><p>{error}</p><button className="journal-back" onClick={() => setAttempt((value) => value + 1)}>Try again <FaArrowRight /></button></div>}
      {!loading && !error && !entries.length && <p className="journal-feedback">{moments.length ? 'No moments in this corner yet.' : 'A few moments are on their way. Come back soon.'}</p>}
      {!loading && !error && <section className="gallery-masonry" aria-label="Photo journal">
        {entries.map((entry, index) => <article className="gallery-pin" key={entry.id} style={{ '--entry-delay': `${Math.min(index * 35, 210)}ms` }}>
          <button className="gallery-photo" onClick={() => setSelected(entry)} aria-label={`View photo: ${photoName(entry)}`}>
            <img src={entry.image} alt={entry.alt || entry.title || 'A photo from Abhijeet’s journal'} width={entry.image_width || undefined} height={entry.image_height || undefined} loading={index < 6 ? 'eager' : 'lazy'} decoding="async" />
            <span className="gallery-open" aria-hidden="true"><FaExpand /></span>
          </button>
          {entry.title && <h2 className="gallery-pin-title"><button onClick={() => setSelected(entry)}>{entry.title}</button></h2>}
        </article>)}
      </section>}
    </div>
    {selected && <PhotoViewer entry={selected} onClose={() => setSelected(null)} />}
  </main>;
}
