<script setup lang="ts">
import constant from '@/const/constant';
import { ref, watch } from 'vue';
const cardClass = 'bg-gray-800 rounded-lg p-4 transition duration-100 scale-100 w-80 shadow-xl';
/* 处理数据，当配置项最后一行为1个时，添加空的站位块 */
let t = JSON.parse(JSON.stringify(constant.priceConfig));
t.length % 3 === 1 ? t.splice(t.length - 1, 0, { id: 'emptyBlock' }) : t;
/* 页面展示的配置项 */
const priceConfig = ref(t);
/* 值变化对应的名称 */
const sectionName = ref(t[0].title);
/* 变化值 */
const stakeValue = ref(100);
/* 监听滑条拖动值的变化 */
const slideChange = (e) => {
    stakeValue.value = e.target.value;
};
/* 值变化对应修改滑条上展示的名称 */
watch(
    stakeValue,
    (newValue, oldValue) => {
        sectionName.value =
            newValue < 10000
                ? newValue < 1000
                    ? newValue < 100
                        ? newValue < 25
                            ? 'FREE'
                            : 'INTERN'
                        : 'ENGINEER'
                    : 'ASTRONAUT'
                : 'MOONWALKER';
    },
    { immediate: true }
);
</script>
<template>
    <div>
        <div class="w-full flex justify-center mt-8 md:mt-16">
            <div class="w-3/4 md:w-1/2">
                <article class="prose dark:prose-invert text-center">
                    <h1>Stake-to-Subscribe</h1>
                    <p
                        >Enjoy premium features on top of ATOM staking <br />rewards (~10% APR) by
                        staking with our validator
                    </p>
                    <p></p>
                    <!-- ... -->
                </article>
                <div class="relative">
                    <div
                        class="absolute w-[7rem] py-1 rounded bg-accent bg-opacity-50 text-violet-200 text-xs text-center uppercase font-bold cursor-default"
                        :style="`left: calc(${
                            stakeValue <= 1000 ? stakeValue / 10 : 100
                        }% - 3rem);`"
                        >{{ sectionName }}</div
                    >
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        :value="stakeValue"
                        class="range range-accent mt-10"
                        @input="slideChange"
                    />
                </div>
                <div class="mt-4">
                    <div class="form-control">
                        <label class="input-group justify-center">
                            <input
                                type="text"
                                v-model="stakeValue"
                                :min="1"
                                :max="10000"
                                oninput="value=value.replace(/[^0-9]/g, '')"
                                class="input input-bordered"
                            />
                            <span>ATOM Staked</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid mx-10 lg:mx-48 my-10">
            <div
                class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-2 lg:px-0 text-gray-100"
            >
                <!-- ring-2 ring-violet-500 scale-[1.025] -->
                <div
                    v-for="config in priceConfig"
                    :key="config.id"
                    :class="
                        config.title
                            ? sectionName === config.title
                                ? cardClass + ' active'
                                : cardClass
                            : ''
                    "
                >
                    <div v-if="config.title">
                        <div
                            class="py-6 sm:py-10 flex justify-center items-center text-xl uppercase tracking-widest font-bold"
                            >{{ config.title }}</div
                        >
                        <div class="flex justify-center items-center space-x-2">
                            <div class="text-4xl sm:text-5xl font-extrabold"
                                >{{ config.minprice }}+</div
                            >
                            <div class="text-gray-400 text-xs sm:text-sm">
                                <p>{{ config.coin }}</p>
                                <p>Staked</p>
                            </div>
                        </div>
                        <div class="flex my-12">
                            <button
                                class="flex-1 text-center bg-accent bg-accent-8 rounded text-violet-100 text-base sm:text-lg lg:text-xl font-bold p-2 transition duration-100"
                                >Stake Now</button
                            >
                        </div>
                        <div v-if="config.features" class="mb-2">
                            <div class="font-bold mb-1">{{ config.features.title }}:</div>
                            <ul class="list-disc list-inside space-y-1">
                                <li v-for="(item, i) in config.features.items" :key="i">{{
                                    item
                                }}</li>
                            </ul>
                        </div>
                        <div v-if="config.steps" class="mt-4 text-gray-400">
                            <div class="font-bold mb-1">{{ config.steps.title }}:</div>
                            <ul class="list-disc list-inside space-y-1">
                                <li v-for="(step, j) in config.steps.items" :key="j">{{ step }}</li>
                            </ul>
                        </div>
                    </div>
                    <!-- <div v-else class="hidden lg:block"></div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.shadow-xl {
    --tw-shadow: 10px 20px 25px -5px rgb(0 0 0 / 0.1), 10px 8px 10px -6px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 10px 20px 25px -5px var(--tw-shadow-color),
        10px 8px 10px -6px var(--tw-shadow-color);
    margin: 0 auto;
}
.input-group input {
    outline: none;
    font-size: 1.5rem;
    width: 10rem;
    font-weight: bolder;
}
.prose {
    max-width: 100%;
}
.active {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
        var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
        var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    --tw-ring-opacity: 1;
    --tw-ring-color: rgb(31 178 166 / var(--tw-ring-opacity));
    --tw-scale-x: 1.025;
    --tw-scale-y: 1.025;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))
        skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
        scaleY(var(--tw-scale-y));
}
.bg-accent-8:hover {
    --tw-bg-opacity: 0.8;
    background-color: hsl(var(--a) / var(--tw-bg-opacity));
}
</style>
