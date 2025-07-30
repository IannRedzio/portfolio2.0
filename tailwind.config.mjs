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
        'primary': '#0E0E29', 
        'primary-dark': '#080818', 
        'accent': '#55c1ff',  
        'secondary': '#FFFFFF', 
        'highlight': '#FBBF24', 
        'light-primary': '#FFFFFF',
        'light-primary-dark': '#F8F9FA',
        'light-secondary': '#1F2937',
        'light-accent': '#3B82F6',
        'light-highlight': '#F59E0B',
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