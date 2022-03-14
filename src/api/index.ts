import axios from 'axios';
import { DISPLAY_COIN_LIST } from '@/const/displayCoinList';
import { useRequest } from 'vue-request';

// 从 https://www.mintscan.io/cosmos 获取 atom 价格信息
export const getAtomPriceApi = () => {
    return axios.get('/backend/cosmostation/v1/market/price?id=uatom');
};

// 获取市场所有的币信息
export const getMarketPricesApi = () => {
    return new Promise((resolve, reject) => {
        axios
            .get('/backend/cosmostation/v1/market/prices')
            .then((res: any) => {
                const coins = Object.keys(DISPLAY_COIN_LIST);
                if (res.length > 0) {
                    // 筛选出展示的 coin
                    const coinList = res.filter((v) => {
                        return coins.includes(v.denom);
                    });
                    // 按照指定顺序排序
                    coinList.sort((a, b) => {
                        return coins.indexOf(a.denom) - coins.indexOf(b.denom);
                    });
                    const displayCoinList = coinList.map((v) => {
                        return {
                            ...v,
                            ...DISPLAY_COIN_LIST[v.denom]
                        };
                    });
                    resolve(displayCoinList);
                } else {
                    reject(res);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};
