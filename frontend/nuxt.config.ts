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
  ],
  css: [
    '@/assets/css/fonts.css',
  ],
  ssr: false,
})
