/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            900: '#0D0D0D',
            800: '#9E1B24',
            700: '#7A1519',
            100: '#FAF0F0',
          },
          stone: '#FFFFFF',
          slate: '#6B7280',
          gold: '#9E1B24',
          'gold-hover': '#7A1519',
          dark: '#0D0D0D',
          body: '#3D3D3A',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.65) 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0D0D0D 0%, #1a0808 35%, #5c1219 70%, #9E1B24 100%)',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        'premium': '0 4px 24px rgba(0,0,0,0.08)',
        'premium-lg': '0 12px 48px -8px rgba(0,0,0,0.12)',
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'count-up': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 12s ease-out forwards',
        'fade-up': 'fade-up 0.5s ease-out',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      clipPath: {
        'diagonal': 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
      },
    },
  },
  plugins: [],
}
