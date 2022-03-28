import { getLangFiles } from './helper';

const zhCNFiles = import.meta.globEager('../../src/**/locale/zh-CN.ts');

export default {
    'navbar.action.locale': '切换为中文',
    'navbar.menu.pairs': '行情',
    'navbar.menu.swap': '图表',
    'navbar.menu.subscribe': '订阅',
    ...getLangFiles(zhCNFiles)
};
