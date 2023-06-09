const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              'style-loader', // Inject styles into the DOM
              'css-loader', // Translates CSS into CommonJS
              'sass-loader' // Compiles Sass to CSS
            ]
          }
        ]
      }
};
