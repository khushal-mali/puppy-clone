'use client';

import { useEffect, useRef } from 'react';
import { HTML_PUPPIES } from '@/data/pageHtml';

export default function PuppiesClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const chips = root.querySelectorAll<HTMLButtonElement>('.tp-sticker-chip');
    // Find all puppy cards (li elements with a link to /puppies/)
    const cards = root.querySelectorAll<HTMLElement>('li:has(a[href^="/puppies/"])');

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const label = chip.textContent?.trim() || '';
        const wasPressed = chip.getAttribute('aria-pressed') === 'true';

        // Update button states
        if (label === 'Everywhere' || wasPressed) {
          chips.forEach((c) => {
            const isEverywhere = c.textContent?.trim() === 'Everywhere';
            c.setAttribute('aria-pressed', isEverywhere ? 'true' : 'false');
          });
          cards.forEach((card) => {
            card.style.display = '';
          });
          return;
        }

        chips.forEach((c) => {
          c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
        });

        // Filter cards
        cards.forEach((card) => {
          const text = (card.textContent || '').toLowerCase();
          const href = (card.querySelector('a')?.getAttribute('href') || '').toLowerCase();
          let match = false;

          switch (label) {
            case 'Imported':
              match = text.includes('imported') || href.includes('imported');
              break;
            case 'Korean Teacup':
              match = text.includes('korean') || href.includes('korean');
              break;
            case 'Maltipoo':
              match = text.includes('maltipoo') || href.includes('maltipoo');
              break;
            case 'Pomeranian':
              match = text.includes('pomeranian') || href.includes('pomeranian');
              break;
            case 'Poodle':
              match = text.includes('poodle') || href.includes('poodle');
              break;
            case 'Cavapoo':
              match = text.includes('cavapoo') || href.includes('cavapoo');
              break;
            case 'Shih Tzu':
              match = text.includes('shih tzu') || text.includes('shitzu') || href.includes('shitzu');
              break;
            case 'Boys':
              match = text.includes('boy') || text.includes('male') || href.includes('male') || href.includes('boy');
              break;
            case 'Girls':
              match = text.includes('girl') || text.includes('female') || href.includes('female') || href.includes('girl');
              break;
            default:
              match = true;
          }

          card.style.display = match ? '' : 'none';
        });
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: HTML_PUPPIES }}
      className="contents"
    />
  );
}
