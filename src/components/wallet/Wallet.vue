<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useWalletStore } from '@/store/wallet'
import { getImageSrc, encodeAddress } from '@/utils'
import { useMessage } from 'naive-ui'
import { Copy16Regular, Share20Regular } from '@vicons/fluent'
import { useClipboard } from '@vueuse/core'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

const walletStore = useWalletStore()
const showWalletListModal = ref(false)
const showProfileModal = ref(false)
const message = useMessage()
const { copy } = useClipboard()

onMounted(() => {
    changeWallet()
})

const walletList = computed(() => {
    return [
        {
            name: 'Keplr Wallet',
            description: 'Keplr Browser Extension',
            icon: 'keplr.png',
            onClick: (): void => {
                createKeplrWallet()
            },
        },
        {
            name: 'WalletConnect',
            description: 'Keplr Mobile',
            icon: 'wallet-connect.png',
            onClick: (): void => {
                createWallectConnect()
            },
        },
    ]
})

const createKeplrWallet = async () => {
    if (!window['getOfflineSigner'] || !window['keplr']) {
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
        await window['keplr'].enable(chainId)
        const addressInfo: any = await window['keplr'].getKey(chainId)

        // const offlineSigner = window.getOfflineSigner(chainId)

        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        // const offlineSignerAccounts = await offlineSigner.getAccounts()
        console.log(addressInfo)
        walletStore.setCurrentAddressInfo({ address: addressInfo.bech32Address, name: addressInfo.name })
        // Initialize the gaia api with the offline signer that is injected by Keplr extension.
        // const cosmJS = new SigningCosmosClient('https://rpc-osmosis.blockapsis.com', accounts.value[0].address, offlineSigner)

        // 关闭弹框
        onWalletListModalClose()
    } catch (e) {
        console.log('eeeeeee', e)
    }
}

const createWallectConnect = () => {
    // Create a connector
    const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal,
    })

    // Check if connection is already established
    if (!connector.connected) {
        // create new session
        connector.createSession()
    }

    // Subscribe to connection events
    connector.on('connect', (error, payload) => {
        if (error) {
            throw error
        }
        console.log('payload', payload)

        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0]
    })

    connector.on('session_update', (error, payload) => {
        if (error) {
            throw error
        }

        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0]
    })

    connector.on('disconnect', (error, payload) => {
        if (error) {
            throw error
        }

        // Delete connector
    })
}

const changeWallet = () => {
    window.addEventListener('keplr_keystorechange', () => {
        console.log('Key store in Keplr is changed. You may need to refetch the account info.')
        createKeplrWallet()
    })
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

const onDisconnect = () => {
    walletStore.reset()
    onProfileModalClose()
}

const openKeplrWallet = () => {
    window.open('https://wallet.keplr.app/#/dashboard', '_blank')
}
const openMintscan = () => {
    window.open(`https://www.mintscan.io/cosmos/account/${walletStore.addressInfo.address}`, '_blank')
}
</script>
<template>
    <div>
        <div v-if="walletStore.addressInfo.address" @click="onProfileModalOpen" class="btn btn-primary btn-outline normal-case btn-xs sm:btn-md ml-4">
            {{ walletStore.addressInfo.name }} | {{ encodeAddress(walletStore.addressInfo.address) }}
        </div>
        <div v-else @click="onWalletListModalOpen" class="btn btn-primary btn-outline normal-case btn-xs sm:btn-md ml-4">
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
                class="w-[24rem] md:w-[30rem]"
                closable
                @close="onProfileModalClose"
                :title="$t('wallet.profile')"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
            >
                <n-space vertical :size="20">
                    <div class="flex items-center rounded-lg space-x-3 p-3 bg-base-200">
                        <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                                <img :src="getImageSrc('logo.png')" alt="IBCcoin" />
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">{{ walletStore.addressInfo.name }}</div>
                            <div class="opacity-50">
                                {{ encodeAddress(walletStore.addressInfo.address, false) }}
                                <n-popover placement="bottom" trigger="click">
                                    <template #trigger>
                                        <n-icon
                                            @click="copy(walletStore.addressInfo.address)"
                                            size="15"
                                            class="hover:text-primary hover:cursor-pointer"
                                        >
                                            <Copy16Regular />
                                        </n-icon>
                                    </template>
                                    <span>{{ $t('wallet.copied') }}</span>
                                </n-popover>
                            </div>
                        </div>
                    </div>
                    <div class="text-lg font-bold">{{ $t('wallet.viewOn') }}</div>
                    <n-space>
                        <div @click="openKeplrWallet" class="btn btn-primary btn-outline btn-sm normal-case">
                            Keplr Wallet
                            <n-icon class="ml-2" size="18">
                                <Share20Regular />
                            </n-icon>
                        </div>
                        <div @click="openMintscan" class="btn btn-primary btn-outline btn-sm normal-case">
                            mintscan.io
                            <n-icon class="ml-2" size="18">
                                <Share20Regular />
                            </n-icon>
                        </div>
                    </n-space>

                    <div @click="onDisconnect" class="btn btn-primary btn-block normal-case">{{ $t('wallet.disconnect') }}</div>
                </n-space>
            </n-card>
        </n-modal>
    </div>
</template>
