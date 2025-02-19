const path = require("path");

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    TestRemoteComponent: "./src/TestRemoteComponent.tsx",
    BattleResults: "./src/BattleResults/components/TypeWrapper.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: {
      type: "system",
    },
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
