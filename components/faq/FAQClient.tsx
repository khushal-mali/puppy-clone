'use client';

import { useEffect, useRef } from 'react';
import { HTML_FAQ } from '@/data/pageHtml';

export default function FAQClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const notesBoard = root.querySelector('.tp-notes');
    const noteElements = root.querySelectorAll<HTMLElement>('.tp-note:not(.tp-note--empty)');
    const emptyNote = root.querySelector<HTMLElement>('.tp-note--empty');
    const searchInput = root.querySelector<HTMLInputElement>('.tp-notes__search input');
    const countEl = root.querySelector<HTMLElement>('.tp-notes__count');

    // 1. Accordion Toggle
    noteElements.forEach((note) => {
      const btn = note.querySelector<HTMLButtonElement>('.tp-note__q button');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        const willExpand = !isExpanded;

        btn.setAttribute('aria-expanded', willExpand ? 'true' : 'false');
        if (willExpand) {
          note.setAttribute('data-unfolded', '');
        } else {
          note.removeAttribute('data-unfolded');
        }

        // Check if any note is unfolded to update parent board state
        const anyOpen = root.querySelector('.tp-note[data-unfolded]') !== null;
        if (notesBoard) {
          if (anyOpen) {
            notesBoard.setAttribute('data-open', '');
          } else {
            notesBoard.removeAttribute('data-open');
          }
        }
      });
    });

    // 2. Search Filter
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        let matchCount = 0;

        noteElements.forEach((note) => {
          const text = note.textContent?.toLowerCase() || '';
          if (!query || text.includes(query)) {
            note.style.display = '';
            matchCount++;
          } else {
            note.style.display = 'none';
          }
        });

        if (countEl) {
          countEl.textContent = query
            ? `${matchCount} of ${noteElements.length} questions`
            : `${noteElements.length} notes on the board`;
        }

        if (emptyNote) {
          emptyNote.style.display = matchCount === 0 ? '' : 'none';
        }
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: HTML_FAQ }}
      className="contents"
    />
  );
}
