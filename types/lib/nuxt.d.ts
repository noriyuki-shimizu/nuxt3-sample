import type { Store } from 'vuex'
import type { RootState } from '@/store/types'

declare module '#app' {
  interface NuxtApp {
    $restClient: (typeof $fetch)['raw']
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $restClient: (typeof $fetch)['raw']
  }
}

export {}
