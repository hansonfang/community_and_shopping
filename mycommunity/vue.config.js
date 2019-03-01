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
    host: '0.0.0.0'
  }
}
