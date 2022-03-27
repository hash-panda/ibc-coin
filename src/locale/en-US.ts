import localeCoinPairs from '@/views/coinPairs/locale/en-US';
import localeHome from '@/views/home/locale/en-US';
import localeSwap from '@/views/swap/locale/en-US';
import locale404 from '@/views/404/locale/en-US';

export default {
    'navbar.action.locale': 'Switch to English',
    ...localeCoinPairs,
    ...localeHome,
    ...localeSwap,
    ...locale404
};
