<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAtomPriceApi, getAtomPrice } from '@/api';
import { useRequest } from 'vue-request';

onMounted(() => {
    getAtomPrice();

    // const { data, run } = useRequest(getAtomPriceApi, {
    //     errorRetryCount: 5,
    //     onError: (error) => {
    //         console.log('(⊙︿⊙) something error', error);
    //     },
    //     onSuccess: () => {
    //         console.log('✿✿ヽ(°▽°)ノ✿ success', data);
    //     }
    // });
    // run();
});
</script>
<template>
    <div>
        <h1>你好，test</h1>
    </div>
</template>
