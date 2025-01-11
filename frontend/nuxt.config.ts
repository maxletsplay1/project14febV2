import Nora from '@primevue/themes/nora';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@hypernym/nuxt-anime',
    '@primevue/nuxt-module',
  ],
  primevue: {
    options: {
      theme: {
        preset: Nora,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }
  },
  css: [
    '@/assets/css/fonts.css',
  ],
  ssr: false,
})