const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [".ts"],
    },
    module: {
        rules: [
          { 
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: "ts-loader"
          }
        ]
      }
};