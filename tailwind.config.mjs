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
        // Modo claro: papel frío derivado del navy de marca
        paper: { DEFAULT: '#EEF0F6', raised: '#F7F8FB', sunk: '#E4E7F0' },
        ink: { DEFAULT: '#1B1D3A', soft: '#464A66', muted: '#62667F' },
        line: { DEFAULT: '#D8DCE8', strong: '#C3C8DA' },
        brand: {
          DEFAULT: '#3047A6',
          hover: '#253A8C',
          tint: '#E3E7F6',
          // Texto sobre botones de marca
          contrast: '#FFFFFF',
          // Variante para modo oscuro: ≥ 7:1 sobre night, night-raised y night-tint
          night: '#9DABFF',
          'night-hover': '#B3BEFF',
          'night-tint': '#1D2150',
        },
        // Modo oscuro: medianoche derivada del mismo navy
        night: { DEFAULT: '#0E0E29', raised: '#15153A', line: '#25254A', 'line-strong': '#36365F' },
        // Texto en modo oscuro: todos ≥ 7:1 sobre night y night-raised
        mist: { DEFAULT: '#ECEDF7', soft: '#B8BAD4', muted: '#A6A9C6' },
        signal: '#F5C451',
      },
      fontFamily: {
        // Texto corrido: neutra
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        // Títulos: grotesca con carácter
        display: ['"Bricolage Grotesque Variable"', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        // Datos: fechas, etiquetas de tecnologías
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
