import { getLangFiles } from './helper'

const zhCNFiles = import.meta.globEager('../../src/**/locale/zh-CN.ts')

export default {
    'navbar.action.locale': '切换为中文',
    'navbar.menu.tokens': '行情',
    'navbar.menu.chart': '图表',
    'navbar.menu.subscribe': '订阅',
    'navbar.menu.about': '关于',
    'navbar.menu.profile': '个人主页',
    'footer.suggestion': '反馈意见',
    ...getLangFiles(zhCNFiles),
}
