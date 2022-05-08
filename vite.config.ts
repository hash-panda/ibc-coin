import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [
            vue(),
            vueJsx(),
            Components({
                resolvers: [NaiveUiResolver(), VueUseComponentsResolver()],
                directoryAsNamespace: true,
            }),
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
        base: env.VITE_PUBLIC_PATH, // 设置打包路径
        server: {
            port: 4040, // 服务启动端口号
            open: true, // 服务启动时自动打开浏览器
            cors: true, // 允许跨域
            // 设置代理
            proxy: {
                '/backend/cosmostation': {
                    target: 'https://api-utility.cosmostation.io',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/backend\/cosmostation/, ''),
                },
                '/backend/ibccoin': {
                    // target: 'http://127.0.0.1:4523/mock/767404',
                    target: 'http://135.181.25.194:7777',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/backend\/ibccoin/, ''),
                },
                '/backend/cosmosNetwork': {
                    target: 'https://api.cosmos.network',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/backend\/cosmosNetwork/, ''),
                },
                '/backend/juno': {
                    target: 'https://lcd-juno.itastakers.com',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/backend\/juno/, ''),
                },
                '/backend/osmosis': {
                    target: 'https://proxy.atomscan.com',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/backend\/osmosis/, ''),
                },
                '/backend/evmos': {
                    target: 'https://rest.bd.evmos.org:1317',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/backend\/evmos/, ''),
                },
                '/backend/assetmantle': {
                    target: 'https://rest.assetmantle.one',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/backend\/assetmantle/, ''),
                },
                '/backend/crescent': {
                    target: 'https://api.crescent.pupmos.network',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/backend\/crescent/, ''),
                },
            },
        },
        build: {
            rollupOptions: {
                plugins: [nodePolyfills()],
            },
            commonjsOptions: {
                transformMixedEsModules: true,
                exclude: ['node_modules/naive-ui/**', 'node_modules/lodash-es/**', 'node_modules/@types/lodash-es/**'],
            },
            minify: 'terser',
            terserOptions: {
                compress: {
                    //生产环境时移除console
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        },
        optimizeDeps: {
            esbuildOptions: {
                // Node.js global to browser globalThis
                define: {
                    global: 'globalThis',
                },
                // Enable esbuild polyfill plugins
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        buffer: true,
                    }),
                ],
            },
        },
    }
})
