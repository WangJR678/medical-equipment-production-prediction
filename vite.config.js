const path = require('path');

module.exports = {
  // 配置需要编译的依赖
  transpileDependencies: true,

  // 配置开发服务器
  devServer: {
    port: 8080, // 端口号
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },

  // 配置路径别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    }
  },

  // 生产环境是否生成 source map 文件
  productionSourceMap: false,
};
