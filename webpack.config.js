const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                {
                  plugins: [
                    '@babel/plugin-proposal-class-properties',
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    publicPath: '/dist',
    proxy: {
      '/api': 'http://localhost:3000',
    },
    hot: true,
    historyApiFallback: true,
  },
};
