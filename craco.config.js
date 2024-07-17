const webpack = require("webpack");

module.exports = {
  webpack: {
    plugins: [
      // This plugin is to provide fallbacks for node variables
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"], // Provides Buffer
        process: "process/browser", // Provides process
      }),
    ],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        buffer: require.resolve("buffer/"), // Fallback for buffer
        process: require.resolve("process/browser"), // Fallback for process
      };

      // This rule is to handle mjs issues which might arise especially with libraries like graphql etc.
      webpackConfig.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false, // Disable the behavior that webpack 5 has by default, requiring the full path
        },
      });

      return webpackConfig;
    },
  },
};
