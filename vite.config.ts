import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
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
    base: './', // 设置打包路径
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
                target: 'http://127.0.0.1:4523/mock/767404',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/backend\/ibccoin/, ''),
            },
        },
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                //生产环境时移除console
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
})
