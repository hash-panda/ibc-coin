import { useMessage } from 'naive-ui'
import { useWalletStore } from '@/store/wallet'

export default function useKeplrWallet() {
    const message = useMessage()
    const walletStore = useWalletStore()

    const createKeplrWallet = async (wallets: any) => {
        if (!window['getOfflineSigner'] || !window['keplr']) {
            message.error('Please install keplr extension')
            return
        }

        for (let index = 0; index < wallets.length; index++) {
            const chainId = wallets[index].chainId

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
                walletStore.setChainInfo({ address: addressInfo.bech32Address, name: addressInfo.name }, walletStore.chainWallet[index].chainName)
                // Initialize the gaia api with the offline signer that is injected by Keplr extension.
                // const cosmJS = new SigningCosmosClient('https://rpc-osmosis.blockapsis.com', accounts.value[0].address, offlineSigner)
            } catch (e) {
                console.log('eeeeeee', e)
                if (e?.message) {
                    message.error(e?.message)
                }
            }
        }
    }
    return {
        createKeplrWallet,
    }
}
