import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        milk: '#fffdf8',
        cocoa: {
          DEFAULT: '#2a170e',
          soft: '#5a3a28',
        },
        honey: {
          DEFAULT: '#f2be6b',
          soft: '#fbe3b4',
        },
        toffee: {
          DEFAULT: '#c2622b',
          deep: '#a24a1a',
          ink: '#8e3f15',
        },
        blush: '#f9cdbf',
        sky: {
          DEFAULT: '#bfddf5',
          deep: '#2f6e9e',
        },
        night: '#24130b',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-figtree)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['var(--font-shantell)', 'ui-rounded', 'cursive'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(42, 23, 14, 0.08)',
        lift: '0 12px 32px -4px rgba(42, 23, 14, 0.14)',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
        pounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        snap: 'cubic-bezier(0.7, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
