<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWalletStore } from '@/store/wallet'
import { getImageSrc, encodeAddress } from '@/utils'
import { useMessage } from 'naive-ui'

const walletStore = useWalletStore()
const showWalletListModal = ref(false)
const showProfileModal = ref(false)
const message = useMessage()
const loading = ref(false)

const walletList = computed(() => {
    return [
        {
            name: 'Keplr Wallet',
            description: 'Keplr Browser Extension',
            icon: 'keplr.png',
            onClick: (): void => {
                connectWallet()
            },
        },
        {
            name: 'WalletConnect',
            description: 'Keplr Mobile',
            icon: 'wallet-connect.png',
            onClick: (): void => {},
        },
    ]
})

const connectWallet = async () => {
    if (!window.getOfflineSigner || !window.keplr) {
        message.error('Please install keplr extension')
        return
    }
    try {
        const chainId = 'cosmoshub-4'
        // const chainIds = ['cosmoshub-4', 'osmosis-1']

        // You should request Keplr to enable the wallet.
        // This method will ask the user whether or not to allow access if they haven't visited this website.
        // Also, it will request user to unlock the wallet if the wallet is locked.
        // If you don't request enabling before usage, there is no guarantee that other methods will work.
        await window.keplr.enable(chainId)

        const offlineSigner = window.getOfflineSigner(chainId)

        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const offlineSignerAccounts = await offlineSigner.getAccounts()
        console.log(offlineSignerAccounts)
        walletStore.setCurrentAddress(offlineSignerAccounts[0].address)
        // Initialize the gaia api with the offline signer that is injected by Keplr extension.
        // const cosmJS = new SigningCosmosClient('https://rpc-osmosis.blockapsis.com', accounts.value[0].address, offlineSigner)
    } catch (e) {
        console.log('eeeeeee', e)
    }
}

const onWalletListModalOpen = () => {
    showWalletListModal.value = true
}
const onWalletListModalClose = () => {
    showWalletListModal.value = false
}

const onProfileModalOpen = () => {
    showProfileModal.value = true
}
const onProfileModalClose = () => {
    showProfileModal.value = false
}
</script>
<template>
    <div>
        <div v-if="walletStore.address" @click="onProfileModalOpen" class="btn btn-primary btn-outline normal-case btn-xs md:btn-md ml-4">
            {{ encodeAddress(walletStore.address) }}
        </div>
        <div v-else @click="onWalletListModalOpen" class="btn btn-primary btn-outline normal-case btn-xs md:btn-md ml-4">
            {{ $t('wallet.connect.btn') }}
        </div>
        <n-modal v-model:show="showWalletListModal">
            <n-card
                class="w-80 md:w-[30rem]"
                :title="$t('wallet.connect.btn')"
                closable
                @close="onWalletListModalClose"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
            >
                <n-space vertical :size="20">
                    <div
                        v-for="item in walletList"
                        :key="item.name"
                        v-on:click="item.onClick"
                        class="flex items-center rounded-lg space-x-3 p-5 bg-base-200 hover:cursor-pointer"
                    >
                        <div class="avatar">
                            <div class="mask mask-squircle w-14 h-14">
                                <img :src="getImageSrc(item.icon)" alt="IBCcoin" />
                            </div>
                        </div>
                        <div>
                            <div class="text-lg font-bold">{{ item.name }}</div>
                            <div class="text-base opacity-50">{{ item.description }}</div>
                        </div>
                    </div>
                </n-space>
            </n-card>
        </n-modal>
        <n-modal v-model:show="showProfileModal">
            <n-card
                style="width: 600px"
                :title="$t('wallet.connect.btn')"
                closable
                @close="onProfileModalClose"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
            >
                hehehehheh
            </n-card>
        </n-modal>
    </div>
</template>
