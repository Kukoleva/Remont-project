import type { Config } from 'tailwindcss';

/**
 * Дизайн-система сайта ремонта квартир.
 * Палитра: изумрудно-зелёные оттенки + лаймовый акцент.
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F7B4E',
          dark: '#0A5C39',
          darker: '#084229',
        },
        accent: {
          DEFAULT: '#3DDC84',
          dark: '#2BB86C',
        },
        light: '#F4FBF7',
        mint: '#D6F5E5',
        ink: '#1A2E24',
        muted: '#6B7C75',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
        'card-lg': '20px',
        xl2: '24px',
      },
      boxShadow: {
        card: '0 10px 30px rgba(15, 123, 78, 0.08)',
        lift: '0 18px 44px rgba(15, 123, 78, 0.16)',
        glow: '0 8px 30px rgba(61, 220, 132, 0.35)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0F7B4E 0%, #0A5C39 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3DDC84 0%, #0F7B4E 100%)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-down': 'fade-down 0.5s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;