import axios from 'axios';
import { DISPLAY_COIN_LIST } from '@/const/displayCoinList';
import { getFormatAmount } from '@/utils';

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
                            currentPrice: v.prices?.[0]?.current_price,
                            currentPriceUnit: v.prices?.[0]?.currency,
                            marketCap: getFormatAmount(v.prices?.[0]?.market_cap),
                            marketCapUnit: v.prices?.[0]?.currency,
                            dailyPriceChangeInPercentage: getFormatAmount(
                                v.prices?.[0]?.daily_price_change_in_percentage
                            ),
                            lastUpdated: v.last_updated,
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

// 查询币信息列表
export const queryTokenListByChain = (chain: string) => {
    return new Promise((resolve, reject) => {
        axios
            .post('/backend/ibccoin/api/v1/model/tokens', {
                page_size: 1000,
                chain
            })
            .then((res: any) => {
                if (res.code === 0) {
                    const result = res.data?.items.map((v) => {
                        return {
                            chain: v.chain,
                            icon: v.moniker,
                            name: v.token_name,
                            coinPair: `${v.token_name} / usd`
                        };
                    });
                    resolve(result);
                } else {
                    reject(res);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

interface KLineRequestParams {
    token_id: number; // token在数据库中的id
    k_line_interval: string; // k线级别，可选参数为 5s,30s,5m,30m,1h,1d
    timestamp_start?: number; // 时间范围起点时间戳，单位s。如果不填写，则根据timestamp_end自动向前推一段时间
    timestamp_end?: number; // 时间范围终点时间戳，单位s。如果不填，则默认为当前时间
}

// 查询 K 线图信息
export const queryKLine = (requestParams: KLineRequestParams) => {
    return new Promise((resolve, reject) => {
        axios
            .post('/backend/ibccoin/api/v1/kline/query_kline', requestParams)
            .then((res: any) => {
                if (res.code === 0) {
                    const result = res.data?.items.map((v) => {
                        return {
                            chain: v.chain,
                            icon: v.moniker,
                            name: v.token_name,
                            coinPair: `${v.token_name} / usd`
                        };
                    });
                    resolve(result);
                } else {
                    reject(res);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};
