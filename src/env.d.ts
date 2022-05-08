/// <reference types="vite/client" />
import { Window as KeplrWindow } from '@keplr-wallet/types'

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}
// declare global {
//     // eslint-disable-next-line @typescript-eslint/no-empty-interface
//     interface Window extends KeplrWindow {}
// }

interface ImportMetaEnv {}
interface ImportMeta {
    readonly env: ImportMetaEnv
    readonly hot: any
}

interface ImportMetaEnv {
    readonly VITE_PUBLIC_PATH: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
