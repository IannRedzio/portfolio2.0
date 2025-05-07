// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  vite: {
    // Eliminamos la configuración que usa require() ya que no es compatible con archivos .mjs
  },

  integrations: [tailwind()]
});