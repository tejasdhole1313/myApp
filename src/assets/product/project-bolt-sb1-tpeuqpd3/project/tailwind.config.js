/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F0',
          100: '#FFEDE2',
          200: '#FFD2B8',
          300: '#FFB78E',
          400: '#FF9C64',
          500: '#FF6B35', // Primary orange
          600: '#E85A28',
          700: '#D14A1F',
          800: '#B93A18',
          900: '#A02E14',
        },
        secondary: {
          50: '#E9F6EC',
          100: '#D3EDD9',
          200: '#A8DBB4',
          300: '#7CC98E',
          400: '#51B768',
          500: '#4CAF50', // Primary green
          600: '#3D8B40',
          700: '#2E6730',
          800: '#1F4320',
          900: '#0F2210',
        },
        accent: {
          50: '#F7F9FF',
          100: '#EFF3FF',
          200: '#D0DDFF',
          300: '#B2C7FF',
          400: '#93B1FF',
          500: '#5A81FF', // Primary blue
          600: '#3B5FF1',
          700: '#2842D1',
          800: '#1F33A0',
          900: '#152470',
        },
        warning: {
          400: '#FACC15',
          500: '#EAB308',
        },
        error: {
          400: '#F87171',
          500: '#EF4444',
        },
        success: {
          400: '#34D399',
          500: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
        dropdown: '0 4px 20px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.4s ease-out',
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};