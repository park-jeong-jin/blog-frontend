const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3308',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' }
      },
      '/chat': {
        target: 'http://localhost:3308',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/chat': '/' }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/_variabled.scss";`
      }
    }
  },
  transpileDependencies: true
})
