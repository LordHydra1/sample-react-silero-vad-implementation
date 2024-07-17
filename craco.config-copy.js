const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: {
    plugins: {
      add: [
        new CopyPlugin({
          patterns: [
            {
              from: "node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js",
              to: "static/js",
            },
            {
              from: "node_modules/@ricky0123/vad-web/dist/silero_vad.onnx",
              to: "static/js",
            },
           
            { from: "node_modules/onnxruntime-web/dist/*.wasm", to: "[name][ext]" },
          ],
        }),
      ],
    },
  },
};
