const path=require("path");

module.exports = {
  configureWebpack:{
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': path.resolve('src'),
        }
      }
  }
}
