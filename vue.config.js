const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
/* module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/app': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
} */
