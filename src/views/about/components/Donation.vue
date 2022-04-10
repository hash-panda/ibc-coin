<script setup lang="ts">
import { computed } from 'vue'
const addresses = computed(() => {
    return [
        {
            chain: 'ATOM',
            address: '--',
        },
        {
            chain: 'OSMO',
            address: '--',
        },
        {
            chain: 'JUNO',
            address: '--',
        },
    ]
})
const openKeplr = () => {
    window.open('https://wallet.keplr.app/#/dashboard', '_blank')
}
</script>
<template>
    <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4">
                {{ $t('donation.title') }}
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                {{ $t('donation.desc') }}
            </p>
            <div class="flex mt-6 justify-center">
                <div class="w-16 h-1 rounded-full bg-green-500 inline-flex"></div>
            </div>
        </div>
        <div class="lg:w-2/3 w-full mx-auto overflow-auto">
            <table class="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                    <tr>
                        <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                            {{ $t('donation.table.header.chain') }}
                        </th>
                        <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            {{ $t('donation.table.header.address') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in addresses" :key="index" class="border-t last:border-b border-gray-100 border-opacity-40">
                        <td class="px-4 py-3">{{ item.chain }}</td>
                        <td class="px-4 py-3">{{ item.address }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <button @click="openKeplr" class="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                {{ $t('donation.btn.gotoDonation') }}
            </button>
        </div>
    </div>
</template>
