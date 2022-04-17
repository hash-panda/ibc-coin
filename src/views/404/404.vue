<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const backToHomepage = () => {
    router.push({
        name: 'tokens',
    })
}
</script>
<template>
    <section class="flex items-center h-full p-16 dark:bg-coolGray-900 dark:text-coolGray-100">
        <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div class="max-w-md text-center">
                <h2 class="mb-8 font-extrabold text-9xl dark:text-coolGray-600">
                    <span class="sr-only">Error</span>
                    404
                </h2>
                <p class="text-2xl font-semibold md:text-3xl">{{ $t('error.404.desc1') }}</p>
                <p class="mt-4 mb-8 dark:text-coolGray-400">{{ $t('error.404.desc2') }}</p>
                <button @click="backToHomepage" class="btn btn-primary">{{ $t('error.404.btn') }}</button>
            </div>
        </div>
    </section>
</template>
