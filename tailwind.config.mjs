/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', 
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        // Sistema de colores dark (por defecto)
        primary: {
          DEFAULT: '#0E0E29',
          dark: '#080818',
          light: '#1A1A3E',
        },
        accent: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
          cyan: '#55c1ff',
        },
        highlight: {
          DEFAULT: '#FBBF24',
          light: '#FCD34D',
          dark: '#F59E0B',
        },
        // Modo claro
        light: {
          primary: '#FFFFFF',
          'primary-dark': '#F8F9FA',
          secondary: '#1F2937',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} 