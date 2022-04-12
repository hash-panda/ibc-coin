<template>
    <div>this is son</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const count = 0
const countRef = ref(1)
const sonFn = () => {
    console.log(`-----------这是子组件-----${countRef.value}--------`)
}

defineExpose({ count, countRef, sonFn })
</script>
