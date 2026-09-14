import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--color-ink)',
          soft: 'var(--color-ink-soft)',
          muted: 'var(--color-ink-muted)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          soft: 'var(--color-accent-soft)',
          faint: 'var(--color-accent-faint)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          raised: 'var(--color-surface-raised)',
          sunken: 'var(--color-surface-sunken)',
        },
        inverse: {
          DEFAULT: 'var(--color-inverse)',
          soft: 'var(--color-inverse-soft)',
        },
        'on-inverse': 'var(--color-on-inverse)',
        'on-accent': 'var(--color-on-accent)',
        status: {
          info: 'var(--color-status-info)',
          watch: 'var(--color-status-watch)',
          fail: 'var(--color-status-fail)',
          ok: 'var(--color-status-ok)',
        },
        threshold: {
          DEFAULT: 'var(--color-threshold)',
          soft: 'var(--color-threshold-soft)',
        },
      },
      fontFamily: {
        sans: ['var(--font-plex)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-source-serif)', 'Source Serif 4', 'Georgia', 'serif'],
        mono: ['var(--font-plex-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        panel: 'var(--shadow-panel)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseLine: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.35s ease-out both',
        pulseLine: 'pulseLine 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
