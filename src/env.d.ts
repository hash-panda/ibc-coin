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
