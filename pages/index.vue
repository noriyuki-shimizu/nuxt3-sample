<template>
    <div class="TopPage">
        サンプル
        <NuxtLink to="/samples">サンプルページへ</NuxtLink>
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

            const response = await $restClient('/comments', {}, { cache: true })
            console.log('pages result: ', response)
            return abortNavigation(createError({
                statusCode: 500,
                message: 'internal server error!!!',
                data: {},
                fatal: true
            }))
        }
    ]
})
// throw createError({ statusCode: 500, message: 'internal server error!!!', fatal: true })
</script>

<style modules lang="scss">
.TopPage {
    background-color: #fff;
}
</style>