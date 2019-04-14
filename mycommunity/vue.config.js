const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        "@": path.resolve("src"),
        "~": path.resolve("src/api"),
      }
    }
  },
  devServer: {
    host: "0.0.0.0"
  },
  assetsDir: "./src/assets"
};
