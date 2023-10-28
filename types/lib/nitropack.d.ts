import type { NitroFetchRequest } from 'nitropack'

declare module 'nitropack' {
    interface NitroFetchOptions {
        isCache?: boolean
    }

    type FetchRawParameters<T = unknown, R extends NitroFetchRequest = NitroFetchRequest> = Parameters<(typeof $fetch<T, R>)['raw']>
}

export {}
