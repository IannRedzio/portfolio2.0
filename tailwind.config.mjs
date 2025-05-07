/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#0E0E29', // Color de fondo oscuro
        'primary-dark': '#080818', // Una variante más oscura
        'accent': '#55c1ff',  // Color de acento para destacados
        'secondary': '#FFFFFF', // Color secundario (blanco para textos)
        'highlight': '#FBBF24', // Color amarillo para destacados
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