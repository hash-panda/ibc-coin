import { accDiv } from './acc';

export function getActualAmount(amount: string | number, presicion?: number) {
    return Number(myFixed(String(accDiv(Number(amount), presicion ?? 1e6)), 2));
}

export function getFormatAmount(amount: string | number) {
    return Number(myFixed(String(amount), 2));
}

/*
 * cosmos1p2s0gv05xkm2ajrrku4xv2t9e64cvu4tn289zt 换为 cosmos1p2s0gv...n289zt
 */
export function encodeAddress(address: string) {
    if (address.trim() && address.length > 20) {
        return `${address.substring(0, 13)}...${address.substring(address.length - 6)}`;
    } else {
        return address.trim();
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
        console.log(`传入的值：${num}不是一个数字`);
        return '0';
    }
    const numFloat = parseFloat(num);
    return (
        Math.round((numFloat + Number.EPSILON) * Math.pow(10, digit)) / Math.pow(10, digit)
    ).toFixed(digit);
}
