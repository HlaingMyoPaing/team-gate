const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: '/my-vue/',
  outputDir: 'dist',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: ['localhost','127.0.0.1','host.docker.internal','.teamgate.local'],
    host: true,
    client: {
       webSocketURL: {
         protocol: 'ws',
         port: 3001,
         hostname: 'host.docker.internal',
         //pathname: '/ws'
       }
    },
    proxy: {
      '/api': {
        target: 'http://host.docker.internal:8085',
        changeOrigin: true
      }
    }

  }
})
