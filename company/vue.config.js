const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
        '/companyapi': {
            target: 'http://localhost:3000',
            changeOrigin: true
        },
        '/public':{
            target: 'http://localhost:3000',
            changeOrigin: true
        }
    }
}    
})
