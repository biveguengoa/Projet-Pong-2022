const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PRODUCTION = false;


module.exports = {
    entry : path.resolve(__dirname, './src/scripts/pong.js'),
    
    mode : (PRODUCTION ? 'production' : 'development'),

    output : {
        path : path.resolve(__dirname, '../server/public'),
        filename : 'scripts/bundle.js'
    },

    devServer: {
        static: {
           publicPath: path.resolve(__dirname, '../server/public'),
           watch : true
        },
        host: 'localhost',
        port : 8085,
        open : true
    },

    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpg|gif)/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name : '[name].[ext]',
                  outputPath : 'images'
                }
              }
            ]
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      },

    plugins : [ 
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template : "./src/index.html",
            filename : "./index.html"
        }),
        new CopyPlugin({
            patterns: [
          {
            from: 'src/images/*',
            to:   'images/[name][ext]'
          },
          {
            from: 'src/style/*',
            to:   'style/[name][ext]'
          },
            ]
         })
    ]


    

};