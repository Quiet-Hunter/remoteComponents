const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    TestRemoteComponent: "./src/TestRemoteComponent.tsx",
    BattleResults: "./src/BattleResults/components/TypeWrapper.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    libraryTarget: "umd",
    globalObject: "this",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  externals: {
    // Do not bundle React; use the host's version.
    react: "React",
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
};
