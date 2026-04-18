/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      colors: {
        /* 對應 main.css :root，使用 rgb + alpha 以支援 bg-bg-base/80 等寫法 */
        'bg-deep': 'rgb(var(--color-bg-deep) / <alpha-value>)',
        'bg-base': 'rgb(var(--color-bg-base) / <alpha-value>)',
        'bg-elevated': 'rgb(var(--color-bg-elevated) / <alpha-value>)',
        'bg-input': 'rgb(var(--color-bg-input) / <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        'fg-muted': 'rgb(var(--color-fg-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-bright': 'rgb(var(--color-accent-bright) / <alpha-value>)',
      },
      boxShadow: {
        card:      '0 0 0 1px rgba(255,255,255,0.06),0 2px 20px rgba(0,0,0,0.4),0 0 40px rgba(0,0,0,0.2)',
        'card-hover': '0 0 0 1px rgba(255,255,255,0.10),0 8px 40px rgba(0,0,0,0.5),0 0 80px rgba(94,106,210,0.10)',
        glow:      '0 0 0 1px rgba(94,106,210,0.5),0 4px 12px rgba(94,106,210,0.3),inset 0 1px 0 0 rgba(255,255,255,0.2)',
        'glow-hover': '0 0 0 1px rgba(94,106,210,0.7),0 6px 20px rgba(94,106,210,0.4),inset 0 1px 0 0 rgba(255,255,255,0.25)',
        inner:     'inset 0 1px 0 0 rgba(255,255,255,0.1)',
      },
      animation: {
        float:   'float 9s ease-in-out infinite',
        'float-slow': 'float 13s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'marquee-seamless': 'marquee-seamless 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':     { transform: 'translateY(-20px) rotate(1deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.6' },
          '50%':     { opacity: '1' },
        },
        'marquee-seamless': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundSize: {
        '400%': '400%',
      },
    },
  },
  plugins: [],
}
