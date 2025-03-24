const path = require("path");

// Common entry points for both builds
const entryPoints = {
  TestRemoteComponent: "./src/TestRemoteComponent.tsx",
  BattleResults: "./src/BattleResults/components/TypeWrapper.tsx",
};

// ES Module build configuration
const esModuleConfig = {
  mode: "production",
  target: "web",
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].esm.js",
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

// Global/window build configuration
const globalConfig = {
  mode: "production",
  target: "web",
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].global.js",
    library: {
      type: "window",
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

module.exports = [esModuleConfig, globalConfig];
