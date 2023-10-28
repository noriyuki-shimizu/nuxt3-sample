// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  plugins: ['@/plugins/rest-client/index.ts'],
  typescript: {
    typeCheck: true,
    tsConfig: {
      include: ['../types/lib/index.d.ts']
    }
  }
})
