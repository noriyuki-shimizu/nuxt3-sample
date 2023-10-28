// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  plugins: ['@/plugins/rest-client/index.ts'],
  /**
   * @see {@link https://nuxt.com/docs/api/configuration/nuxt-config#imports}
   */
  imports: {
    dirs: ['composables/*/index.{ts,js,mjs,mts}', 'utils/*/index.{ts,js,mjs,mts}']
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      include: ['../types/lib/index.d.ts']
    }
  }
})
