/**
 * 获取所有语言文件
 * @param {Object} mList
 */
export function getLangFiles(mList: any) {
    let msg = {};
    for (let path in mList) {
        if (mList[path].default) {
            console.log('mList[path].default', mList[path].default);
            msg = { ...msg, ...mList[path].default };
        }
    }
    return msg;
}
