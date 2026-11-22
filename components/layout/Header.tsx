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

    const menuBtn = headerEl.querySelector<HTMLButtonElement>('button[aria-haspopup="dialog"]');
    const dialog = headerEl.querySelector<HTMLDialogElement>('dialog');
    const closeBtn = dialog?.querySelector<HTMLButtonElement>('button');

    const handleMenuOpen = () => {
      if (typeof dialog?.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog?.setAttribute('open', 'true');
      }
      setMobileMenuOpen(true);
    };

    const handleMenuClose = () => {
      if (typeof dialog?.close === 'function') {
        dialog.close();
      } else {
        dialog?.removeAttribute('open');
      }
      setMobileMenuOpen(false);
    };

    if (menuBtn && dialog) {
      menuBtn.addEventListener('click', handleMenuOpen);
    }

    if (closeBtn && dialog) {
      closeBtn.addEventListener('click', handleMenuClose);
    }

    const dialogLinks = dialog?.querySelectorAll('a');
    dialogLinks?.forEach((link) => {
      link.addEventListener('click', handleMenuClose);
    });

    // Handle scroll state on header
    let prevScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const liveHeader = document.getElementById('site-header') || headerEl;
      if (!liveHeader) {
        ticking = false;
        return;
      }

      const currentDialog = liveHeader.querySelector<HTMLDialogElement>('dialog');
      if (currentDialog?.hasAttribute('open')) {
        liveHeader.dataset.hidden = 'false';
        prevScrollY = window.scrollY;
        ticking = false;
        return;
      }

      const currentScrollY = window.scrollY;
      liveHeader.dataset.scrolled = currentScrollY > 8 ? 'true' : 'false';

      if (currentScrollY <= 50) {
        liveHeader.dataset.hidden = 'false';
        prevScrollY = currentScrollY;
      } else if (Math.abs(currentScrollY - prevScrollY) > 6) {
        liveHeader.dataset.hidden = currentScrollY > prevScrollY && currentScrollY > 100 ? 'true' : 'false';
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
      const liveHeader = document.getElementById('site-header') || headerEl;
      if (liveHeader) liveHeader.dataset.hidden = 'false';
    };

    updateHeader();
    window.addEventListener('scroll', handleScroll, { passive: true });
    headerEl.addEventListener('focusin', handleFocusIn);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      headerEl.removeEventListener('focusin', handleFocusIn);
      menuBtn?.removeEventListener('click', handleMenuOpen);
      closeBtn?.removeEventListener('click', handleMenuClose);
      dialogLinks?.forEach((link) => {
        link.removeEventListener('click', handleMenuClose);
      });
    };
  }, [pathname]);

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
