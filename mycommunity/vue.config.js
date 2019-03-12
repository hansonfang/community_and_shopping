const path=require("path");

module.exports = {
  configureWebpack:{
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': path.resolve('src'),
        }
      }
  },
  devServer:{
    host: '0.0.0.0',
    proxy:{
      "/chengfeng":{
        target:"http://47.95.244.237:9990",
        changeOrigin: true,
        pathRewrite:{
          "^/chengfeng":""
        }
      }},
  },
  assetsDir:"./src/assets"
}
