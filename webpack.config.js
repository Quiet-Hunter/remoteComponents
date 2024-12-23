const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    RemoteComponent: "./src/RemoteComponent.tsx",
    RemoteComponent2: "./src/RemoteComponent2.tsx",
    CbComponent: "./src/CbComponent.tsx",
    RecordMessage: "./src/RecordMessage.tsx",
    Worker: "./src/remote.worker.tsx",
    ComponentWorker: "./src/component.worker.tsx",
    TextComponent: "./src/TextComponent.worker.tsx",
    BattleResult: "./src/BattleResult.worker.tsx",
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
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: false,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 4000,
  },
};
