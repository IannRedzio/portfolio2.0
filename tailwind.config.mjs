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
        // Modo claro: papel frío derivado del navy de marca
        paper: { DEFAULT: '#EEF0F6', raised: '#F7F8FB', sunk: '#E4E7F0' },
        ink: { DEFAULT: '#1B1D3A', soft: '#464A66', muted: '#62667F' },
        line: { DEFAULT: '#D8DCE8', strong: '#C3C8DA' },
        brand: { DEFAULT: '#3047A6', hover: '#253A8C', tint: '#E3E7F6', night: '#8B9CFF', 'night-hover': '#A7B4FF', 'night-tint': '#1D2150' },
        // Modo oscuro: medianoche derivada del mismo navy
        night: { DEFAULT: '#0E0E29', raised: '#15153A', line: '#25254A', 'line-strong': '#36365F' },
        mist: { DEFAULT: '#ECEDF7', soft: '#B8BAD4', muted: '#8E91B0' },
        signal: '#F5C451',
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