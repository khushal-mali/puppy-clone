'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { HTML_HEADER } from '@/data/pageHtml';
import MobileDrawer from './MobileDrawer';

function getHeaderHtml(pathname: string) {
  const isHome = pathname === '/';
  if (isHome) return HTML_HEADER;

  let html = HTML_HEADER.replace('data-home="true"', '');
  html = html.replaceAll('data-active="true" href="/"', 'data-active="false" href="/"');
  html = html.replaceAll('aria-current="page"', '');

  const routes = ['/puppies', '/happy-families', '/how-it-works', '/faq', '/contact'];
  const matchedRoute = routes.find((r) => pathname === r || pathname.startsWith(`${r}/`));
  if (matchedRoute) {
    html = html.replaceAll(
      `data-active="false" href="${matchedRoute}"`,
      `data-active="true" aria-current="page" href="${matchedRoute}"`
    );
  }

  return html;
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    const isHome = pathname === '/';
    if (isHome) {
      headerEl.setAttribute('data-home', 'true');
    } else {
      headerEl.removeAttribute('data-home');
    }

    const allLinks = headerEl.querySelectorAll<HTMLAnchorElement>('.tp-nav-link, .tp-menu-link');
    allLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const isActive = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
      if (isActive) {
        link.setAttribute('data-active', 'true');
        link.setAttribute('aria-current', 'page');
      } else {
        link.setAttribute('data-active', 'false');
        link.removeAttribute('aria-current');
      }
    });
  }, [pathname]);

  useEffect(() => {
    const headerEl = document.getElementById('site-header');
    if (headerEl) {
      const menuBtn = headerEl.querySelector<HTMLButtonElement>('button[aria-haspopup="dialog"]');
      const dialog = headerEl.querySelector<HTMLDialogElement>('dialog');
      const closeBtn = dialog?.querySelector<HTMLButtonElement>('button');

      if (menuBtn && dialog) {
        menuBtn.addEventListener('click', () => {
          if (typeof dialog.showModal === 'function') {
            dialog.showModal();
          } else {
            dialog.setAttribute('open', 'true');
          }
          setMobileMenuOpen(true);
        });
      }

      if (closeBtn && dialog) {
        closeBtn.addEventListener('click', () => {
          if (typeof dialog.close === 'function') {
            dialog.close();
          } else {
            dialog.removeAttribute('open');
          }
          setMobileMenuOpen(false);
        });
      }

      if (dialog) {
        const dialogLinks = dialog.querySelectorAll('a');
        dialogLinks.forEach((link) => {
          link.addEventListener('click', () => {
            if (typeof dialog.close === 'function') {
              dialog.close();
            } else {
              dialog.removeAttribute('open');
            }
            setMobileMenuOpen(false);
          });
        });
      }

      // Handle scroll state on header
      let prevScrollY = window.scrollY;
      let ticking = false;

      const updateHeader = () => {
        const currentScrollY = window.scrollY;
        headerEl.dataset.scrolled = currentScrollY > 8 ? 'true' : 'false';

        if (dialog?.hasAttribute('open')) {
          headerEl.dataset.hidden = 'false';
          prevScrollY = currentScrollY;
          ticking = false;
          return;
        }

        if (currentScrollY <= 50) {
          headerEl.dataset.hidden = 'false';
          prevScrollY = currentScrollY;
        } else if (Math.abs(currentScrollY - prevScrollY) > 6) {
          headerEl.dataset.hidden = currentScrollY > prevScrollY && currentScrollY > 100 ? 'true' : 'false';
          prevScrollY = currentScrollY;
        }
        ticking = false;
      };

      const handleScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateHeader);
        }
      };

      const handleFocusIn = () => {
        headerEl.dataset.hidden = 'false';
      };

      updateHeader();
      window.addEventListener('scroll', handleScroll, { passive: true });
      headerEl.addEventListener('focusin', handleFocusIn);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        headerEl.removeEventListener('focusin', handleFocusIn);
      };
    }
  }, []);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: getHeaderHtml(pathname) }}
        className="contents"
      />
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
