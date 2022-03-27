import localeCoinPairs from '@/views/coinPairs/locale/zh-CN';
import localeHome from '@/views/home/locale/zh-CN';
import localeSwap from '@/views/swap/locale/zh-CN';
import locale404 from '@/views/404/locale/zh-CN';

export default {
    'navbar.action.locale': '切换为中文',
    ...localeCoinPairs,
    ...localeHome,
    ...localeSwap,
    ...locale404
};
