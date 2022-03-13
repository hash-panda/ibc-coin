<script setup lang="ts">
import KLine from '@/components/kLine/KLine.vue';
</script>
<template>
    <div>
        <div class="flex flex-row m-4">
            <div class="basis-3/4"><KLine /></div>
            <div class="basis-1/4">
                <div class="card w-full h-3/4 bg-base-200">
                    <div class="card-body">
                        <!-- <h2 class="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
