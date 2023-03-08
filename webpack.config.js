const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build'),
    },
    resolve: {
        extensions: [".ts"],
    },
    module: {
        rules: [
          { 
            test: /\.tsx?$/,
            exclude: [/node_modules/, /assets/] ,
            loader: "ts-loader"
          }
        ]
      }
};