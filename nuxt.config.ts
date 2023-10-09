// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: ["@/assets/styles/main.css"],
  devtools: { enabled: true },
  plugins: ['@/plugins/rest-client/index.ts'],
})
