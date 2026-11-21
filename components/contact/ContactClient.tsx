'use client';

import { useEffect, useRef } from 'react';
import { HTML_CONTACT } from '@/data/pageHtml';

export default function ContactClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const form = root.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]');
      const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"]');
      const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]');
      const areaInput = form.querySelector<HTMLInputElement>('input[name="area"]');
      const messageInput = form.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
      const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');

      const name = nameInput?.value.trim() || '';
      const phone = phoneInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const area = areaInput?.value.trim() || '';
      const message = messageInput?.value.trim() || '';

      if (!name || !phone) {
        alert('Please provide your name and phone/WhatsApp number.');
        return;
      }

      if (submitBtn) {
        submitBtn.textContent = 'Posting your letter... 💌';
        submitBtn.disabled = true;
      }

      const waText = encodeURIComponent(
        `Hi TeddyPups U.A.E.! I would like to visit the showroom or enquire about available puppies.\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        (area ? `Area: ${area}\n` : '') +
        (email ? `Email: ${email}\n` : '') +
        (message ? `Note: ${message}\n` : '')
      );

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.textContent = 'Letter posted to WhatsApp! ✨';
        }
        window.open(`https://wa.me/919898124987?text=${waText}`, '_blank');
      }, 400);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: HTML_CONTACT }}
      className="contents"
    />
  );
}
