const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    RemoteComponent: "./src/RemoteComponent.tsx",
    RemoteComponent2: "./src/RemoteComponent2.tsx",
    TextComponent: "./src/TextComponent.tsx",
    CbComponent: "./src/CbComponent.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "[name]",
    libraryTarget: "umd",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 4000,
  },
};
