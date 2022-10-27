const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3308',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {'^/api': '/'}
      }
    }
  },
  transpileDependencies: true
})
