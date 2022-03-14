<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAtomPrice } from '@/api';

onMounted(() => {
    getAtomPrice();
});
</script>
<template>
    <div>
        <h1>你好，test</h1>
    </div>
</template>
