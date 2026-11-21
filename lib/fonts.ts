import localFont from 'next/font/local';

export const fontFraunces = localFont({
  src: '../public/fonts/54fc36028e2bb174-s.p.20jfceqj9zyw9.woff2',
  variable: '--font-fraunces',
  display: 'swap',
  fallback: ['Times New Roman', 'Georgia', 'serif'],
});

export const fontFigtree = localFont({
  src: '../public/fonts/f7aa21714c1c53f8-s.p.0-95eo-012xnf.woff2',
  variable: '--font-figtree',
  display: 'swap',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
});

export const fontShantell = localFont({
  src: '../public/fonts/c25c3c50e24471d2-s.p.1-0ft7iz2f4p6.woff2',
  variable: '--font-shantell',
  display: 'swap',
  fallback: ['ui-rounded', 'Comic Sans MS', 'cursive'],
});
