const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    TestRemoteComponent: "./src/TestRemoteComponent.tsx",
    BattleResults: "./src/BattleResults/components/TypeWrapper.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].mjs",
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  externals: {
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
