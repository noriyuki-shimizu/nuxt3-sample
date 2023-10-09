<template>
    <NuxtLayout>
        <template v-if="!isNil(error)">
            <template v-if="isError(error)">
                <div>
                    <h2>致命的エラーが発生しました。</h2>
                    <pre>{{ error }}</pre>
                </div>
            </template>
            <template v-else>
                <div>
                    <h2>{{ error.message }}</h2>
                    <pre>{{ error.statusCode }}</pre>
                    <pre>{{ error.data }}</pre>
                </div>
            </template>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'

useHeadSafe({
  title: 'エラーページ',
  meta: [
    {
      name: 'description',
      content: 'こちらはエラーページです。'
    }
  ]
})
useHead({
  htmlAttrs: {
    lang: 'ja'
  }
})

/** Error */
const error = useError()

const isError = (error?: string | object | null): error is Error => {
    return error instanceof Error
}
</script>
