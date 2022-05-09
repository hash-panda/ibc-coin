<script setup lang="ts">
import { onMounted } from 'vue'
import Account from './account/account.vue'
import WalletRadio from '@/components/walletRadio/WalletRadio.vue'
import { useWalletStore } from '@/store/wallet'

const walletStore = useWalletStore()

onMounted(() => {
    walletStore.setCurrentSelectedWallet(walletStore.chainWallet[0])
})
</script>
<template>
    <div class="m-5">
        <div class="grid grid-rows-1 grid-flow-col gap-4">
            <div class="row-span-1">
                <WalletRadio :wallet-info="walletStore.chainWallet" />
            </div>
            <div class="col-span-2">
                <Account :address="walletStore.currentSelectedWallet.address" />
            </div>
        </div>
    </div>
</template>
