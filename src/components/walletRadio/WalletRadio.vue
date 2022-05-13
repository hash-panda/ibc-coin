<script setup lang="ts">
import { ref, watch } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupDescription, RadioGroupOption } from '@headlessui/vue'
import { encodeAddress } from '@/utils'
import { useWalletStore } from '@/store/wallet'
import { useMessage } from 'naive-ui'
import useKeplrWallet from '@/utils/wallet'

const props = defineProps({
    walletInfo: {
        type: Array,
    },
})
const { convertCosmosAddress } = useKeplrWallet()
const message = useMessage()
const walletStore = useWalletStore()
const selected = ref(props.walletInfo?.[0])
watch(
    () => selected.value,
    () => {
        walletStore.setCurrentSelectedWallet(selected.value)
    },
)

const createKeplrWallet = async (wallet: any) => {
    if (!window['getOfflineSigner'] || !window['keplr']) {
        message.error('Please install keplr extension')
        return
    }

    const chainId = wallet?.chainId

    try {
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
        // walletStore.setCurrentAddressInfo({ address: addressInfo.bech32Address, name: addressInfo.name })
        walletStore.setChainInfo({ address: addressInfo.bech32Address, name: addressInfo.name }, wallet?.chainName)

        // 根据 cosmos 来转换其他地址
        if (wallet?.chainName === 'cosmos') {
            walletStore.chainInfoArray.forEach(v => {
                const convertAddress = convertCosmosAddress(addressInfo.bech32Address, v.prefix)
                walletStore.setChainInfo({ address: convertAddress, name: addressInfo.name }, v.chainName)
            })
        }

        // Initialize the gaia api with the offline signer that is injected by Keplr extension.
        // const cosmJS = new SigningCosmosClient('https://rpc-osmosis.blockapsis.com', accounts.value[0].address, offlineSigner)
    } catch (e) {
        if (e?.message) {
            message.error(e?.message)
        }
    }
}
</script>
<template>
    <div class="w-full px-4 py-16">
        <div class="mx-auto w-full max-w-md">
            <RadioGroup v-model="selected">
                <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
                <div class="space-y-2">
                    <RadioGroupOption
                        as="template"
                        v-for="wallet in (walletInfo as any)"
                        :key="wallet.chainName"
                        :value="wallet"
                        v-slot="{ active, checked }"
                    >
                        <div
                            :class="[checked ? 'bg-primary bg-opacity-75 text-white ' : 'bg-white']"
                            class="relative flex cursor-pointer rounded-lg px-4 py-4 shadow-md focus:outline-none"
                        >
                            <div class="flex w-full items-center justify-between">
                                <div class="flex items-center">
                                    <div class="text-sm">
                                        <RadioGroupLabel
                                            as="p"
                                            :class="checked ? 'text-white' : 'text-gray-900'"
                                            class="font-bold text-lg capitalize"
                                        >
                                            {{ wallet.chainName }}
                                            <span>
                                                <div v-if="wallet.address" class="badge badge-success badge-sm">{{ $t('wallet.radio.connect') }}</div>
                                                <div
                                                    v-else-if="wallet.needConnect"
                                                    @click="createKeplrWallet(wallet)"
                                                    class="badge badge-error badge-sm"
                                                >
                                                    {{ $t('wallet.radio.notconnect.toConnect') }}
                                                </div>
                                                <div v-else class="badge badge-error badge-sm">
                                                    {{ $t('wallet.radio.notconnect') }}
                                                </div>
                                            </span>
                                        </RadioGroupLabel>
                                        <RadioGroupDescription as="span" :class="checked ? 'text-white' : 'text-gray-900'" class="inline">
                                            <span>{{ encodeAddress(wallet.address, false) }}</span>
                                        </RadioGroupDescription>
                                    </div>
                                </div>
                                <div v-show="checked" class="shrink-0 text-white">
                                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.2" />
                                        <path d="M7 13l3 3 7-7" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </RadioGroupOption>
                </div>
            </RadioGroup>
        </div>
    </div>
</template>
