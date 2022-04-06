import { ExtractValue, SelectItem } from '@/types/types'
import { accDiv } from './acc'
import numeral from 'numeral'

export function getActualAmount(amount: string | number, presicion?: number) {
    return accDiv(Number(amount), presicion ?? 1e6)
}

export function getFixedAmount(amount: string | number, decimal: number = 2) {
    if (typeof Number(decimal) === 'number') {
        return Number(myFixed(String(amount), decimal))
    } else {
        return 0
    }
}

export function formatAmountWithDollar(amount: string | number, decimal: number = 0) {
    if (amount) {
        const decimalLength = Array(decimal ? decimal + 1 : 0).join('0')
        return numeral(amount).format(`$0,0.${decimalLength}`)
    } else {
        return '--'
    }
}

export function formatPercentage(amount: string | number) {
    return numeral(amount).format('0.000%')
}

/*
 * cosmos1p2s0gv05xkm2ajrrku4xv2t9e64cvu4tn289zt 换为 cosmos1p2s0gv...n289zt
 */
export function encodeAddress(address: string, short: boolean = true) {
    let length = 13
    if (short) {
        length = 6
    }
    if (address.trim() && address.length > 20) {
        return `${address.substring(0, length)}...${address.substring(address.length - 6)}`
    } else {
        return address.trim()
    }
}

/**
 * 保留小数点几位数, 自动补零, 四舍五入
 * @param num: 数值
 * @param digit: 小数点后位数
 * @returns string
 */
export function myFixed(num: string, digit: number): string {
    if (Object.is(parseFloat(num), NaN)) {
        console.log(`传入的值：${num}不是一个数字`)
        return '0'
    }
    const numFloat = parseFloat(num)
    return (Math.round((numFloat + Number.EPSILON) * Math.pow(10, digit)) / Math.pow(10, digit)).toFixed(digit)
}

export const genMapObject = <T extends Readonly<SelectItem[]>>(originData: T) => {
    const o: {
        [K in T[number]['value']]: ExtractValue<T[number], K>
    } = Object.create(null)
    originData.forEach(item => {
        o[item.value as T[number]['value']] = item.label as ExtractValue<T[number], T[number]['value']>
    })
    return o
}

function isURL(url: string) {
    var strRegex = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
    var re = new RegExp(strRegex)
    return re.test(url)
}

/**
 *
 * @param name 图片名称
 * @returns
 */
export const getImageSrc = (name: string) => {
    // const path = `/src/assets/images/${name}`;
    // const modules = import.meta.globEager('/src/assets/images/*');
    // return modules[path].default;
    if (isURL(name)) {
        return name
    } else {
        return new URL(`../assets/images/${name}`, import.meta.url).href
    }
}
