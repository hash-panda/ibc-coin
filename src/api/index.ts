import axios from 'axios';
import { useRequest } from 'vue-request';

// 从 https://www.mintscan.io/cosmos 获取 atom 价格信息
export function getAtomPrice() {
    // https://api-utility.cosmostation.io/v1//market/price?id=uatom
    const getAtomPriceApi = () => {
        return axios.get('https://api-utility.cosmostation.io/v1//market/price?id=uatom');
    };
    const { data, run } = useRequest(getAtomPriceApi, {
        errorRetryCount: 5,
        initialData: 'init',
        onError: (error) => {
            console.log('(⊙︿⊙) something error', error);
        },
        onSuccess: () => {
            console.log('✿✿ヽ(°▽°)ノ✿ success', data);
        }
    });
    run();
}
