<template>
    <div class="TopPage">
        <h1>トップページ</h1>
        <NuxtLink to="/samples">サンプルページへ</NuxtLink>
        <div>
            <button type="button" @click="onClick">例外発生</button>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'sample2',
    middleware: [
        async () => {
            const { $restClient, isHydrating } = useNuxtApp()

            if (isHydrating) {
                return
            }

            const response = await $restClient('/comments', { isCache: true })
            console.log('pages result: ', response)

            /*
            // middleware で例外発生の場合のエラー表示
            return abortNavigation(createError({
                statusCode: 500,
                message: 'internal server error!!!',
                data: {},
                fatal: true
            }))
            */
        }
    ]
})

/**
 * 例外を発生させる
 */
function onClick() {
    throw createError({ statusCode: 500, message: '例外が発生しました！', fatal: true })
}
</script>

<style modules lang="scss">
.TopPage {
    background-color: #fff;
}
</style>