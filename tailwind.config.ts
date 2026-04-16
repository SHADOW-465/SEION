import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void:    '#0C0C0E',
        cream:   '#F5F2EB',
        surface: '#141416',
        gold:    '#D4952A',
        green:   '#22C47A',
        danger:  '#E04040',
        teal:    '#1a5c4a',
        'teal-2': '#236b57',
        'teal-light': '#d6ece5',
        'ink-2': '#3d3c38',
        'ink-3': '#8a8880',
        border:  '#d8d4c8',
        'surface-light': '#ece9e1',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        card:   '16px',
        button: '8px',
        pill:   '9999px',
        sm:     '2px',
      },
    },
  },
  plugins: [],
};

export default config;
