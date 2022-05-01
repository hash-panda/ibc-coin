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
