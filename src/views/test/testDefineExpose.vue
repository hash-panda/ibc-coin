<template>
    <div>
        <Son ref="sonRef" />
    </div>
</template>
<script setup lang="ts">
import { Ref, ref, onMounted } from 'vue'
import Son from './components/Son.vue'

interface sonData {
    count: number
    countRef: Ref
    sonFn: () => void
}
const sonRef = ref<InstanceType<typeof Son> & sonData>()
onMounted(() => {
    console.log(sonRef.value?.sonFn())
    console.log(sonRef.value?.count)
    console.log(sonRef.value?.countRef)
})
</script>
