<script setup lang="ts">
import { onMounted } from 'vue'
import { SigningCosmosClient } from '@cosmjs/launchpad'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { assertIsBroadcastTxSuccess, SigningStargateClient } from '@cosmjs/stargate'

const connectWallet = async () => {
    if (!window.getOfflineSigner || !window.keplr) {
        alert('Please install keplr extension')
    } else {
        const chainId = 'cosmoshub-4'

        // Enabling before using the Keplr is recommended.
        // This method will ask the user whether to allow access if they haven't visited this website.
        // Also, it will request that the user unlock the wallet if the wallet is locked.
        await window.keplr.enable(chainId)

        const offlineSigner = window.keplr.getOfflineSigner(chainId)

        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const accounts = await offlineSigner.getAccounts()

        // Initialize the gaia api with the offline signer that is injected by Keplr extension.
        const cosmJS = new SigningCosmosClient('https://lcd-cosmoshub.keplr.app', accounts[0].address, offlineSigner)
    }
}

onMounted(() => {
    connectWallet()
})
</script>
<template>
    <div class="h-screen w-screen"></div>
</template>
