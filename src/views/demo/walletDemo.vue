<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SigningCosmosClient } from '@cosmjs/launchpad'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { assertIsDeliverTxSuccess, SigningStargateClient } from '@cosmjs/stargate'
import Wallet from '@/components/wallet/Wallet.vue'

const accounts = ref<any>([])

const connectWallet = async () => {
    if (!window.getOfflineSigner || !window.keplr) {
        alert('Please install keplr extension')
    } else {
        if (window.keplr.experimentalSuggestChain) {
            try {
                // await window.keplr.experimentalSuggestChain({
                //     // Chain-id of the Osmosis chain.
                //     chainId: 'osmosis-1',
                //     // The name of the chain to be displayed to the user.
                //     chainName: 'Osmosis mainnet',
                //     // RPC endpoint of the chain. In this case we are using blockapsis, as it's accepts connections from any host currently. No Cors limitations.
                //     rpc: 'https://rpc-osmosis.blockapsis.com',
                //     // REST endpoint of the chain.
                //     rest: 'https://lcd-osmosis.blockapsis.com',
                //     // Staking coin information
                //     stakeCurrency: {
                //         // Coin denomination to be displayed to the user.
                //         coinDenom: 'OSMO',
                //         // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                //         coinMinimalDenom: 'uosmo',
                //         // # of decimal points to convert minimal denomination to user-facing denomination.
                //         coinDecimals: 6,
                //         // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                //         // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                //         // coinGeckoId: ""
                //     },
                //     // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
                //     // The 'stake' button in Keplr extension will link to the webpage.
                //     // walletUrlForStaking: "",
                //     // The BIP44 path.
                //     bip44: {
                //         // You can only set the coin type of BIP44.
                //         // 'Purpose' is fixed to 44.
                //         coinType: 118,
                //     },
                //     // Bech32 configuration to show the address to user.
                //     // This field is the interface of
                //     // {
                //     //   bech32PrefixAccAddr: string;
                //     //   bech32PrefixAccPub: string;
                //     //   bech32PrefixValAddr: string;
                //     //   bech32PrefixValPub: string;
                //     //   bech32PrefixConsAddr: string;
                //     //   bech32PrefixConsPub: string;
                //     // }
                //     bech32Config: {
                //         bech32PrefixAccAddr: 'osmo',
                //         bech32PrefixAccPub: 'osmopub',
                //         bech32PrefixValAddr: 'osmovaloper',
                //         bech32PrefixValPub: 'osmovaloperpub',
                //         bech32PrefixConsAddr: 'osmovalcons',
                //         bech32PrefixConsPub: 'osmovalconspub',
                //     },
                //     // List of all coin/tokens used in this chain.
                //     currencies: [
                //         {
                //             // Coin denomination to be displayed to the user.
                //             coinDenom: 'OSMO',
                //             // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                //             coinMinimalDenom: 'uosmo',
                //             // # of decimal points to convert minimal denomination to user-facing denomination.
                //             coinDecimals: 6,
                //             // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                //             // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                //             // coinGeckoId: ""
                //         },
                //     ],
                //     // List of coin/tokens used as a fee token in this chain.
                //     feeCurrencies: [
                //         {
                //             // Coin denomination to be displayed to the user.
                //             coinDenom: 'OSMO',
                //             // Actual denom (i.e. uosmo, uscrt) used by the blockchain.
                //             coinMinimalDenom: 'uosmo',
                //             // # of decimal points to convert minimal denomination to user-facing denomination.
                //             coinDecimals: 6,
                //             // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                //             // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                //             // coinGeckoId: ""
                //         },
                //     ],
                //     // (Optional) The number of the coin type.
                //     // This field is only used to fetch the address from ENS.
                //     // Ideally, it is recommended to be the same with BIP44 path's coin type.
                //     // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
                //     // So, this is separated to support such chains.
                //     coinType: 118,
                //     // (Optional) This is used to set the fee of the transaction.
                //     // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
                //     // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
                //     // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
                //     gasPriceStep: {
                //         low: 0.01,
                //         average: 0.025,
                //         high: 0.04,
                //     },
                // })
            } catch {
                alert('Failed to suggest the chain')
            }
        } else {
            alert('Please use the recent version of keplr extension')
        }
    }
    // const chainId = 'cosmoshub-4'
    const chainIds = ['cosmoshub-4', 'osmosis-1']

    // You should request Keplr to enable the wallet.
    // This method will ask the user whether or not to allow access if they haven't visited this website.
    // Also, it will request user to unlock the wallet if the wallet is locked.
    // If you don't request enabling before usage, there is no guarantee that other methods will work.
    await window.keplr.enable(chainIds)
    accounts.value = []
    chainIds.forEach(async v => {
        const offlineSigner = window.getOfflineSigner(v)

        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const offlineSignerAccounts = await offlineSigner.getAccounts()
        accounts.value.push(offlineSignerAccounts[0])
        console.log(offlineSignerAccounts, accounts.value)
        // Initialize the gaia api with the offline signer that is injected by Keplr extension.
        // const cosmJS = new SigningCosmosClient('https://rpc-osmosis.blockapsis.com', accounts.value[0].address, offlineSigner)
    })
}

onMounted(() => {
    // connectWallet()
})
</script>
<template>
    <div class="h-screen w-screen">
        <Wallet />
    </div>
</template>
