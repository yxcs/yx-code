import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import styleImport from 'vite-plugin-style-import'; // 如果需要按需加载

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: '8081',
    hmr:  true,
  },
  css: {
    preprocessorOptions: {
      less: {
        // 如果需要，在这里可以添加 Less 的全局变量等配置
        javascriptEnabled: true, // 允许在 Less 中使用 JavaScript 表达式
        additionalData: `@import "./src/styles/global.less";` // 引入全局变量文件
      }
    }
  }
})
