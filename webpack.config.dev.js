import path from 'path';
const ImageminPlugin = require('imagemin-webpack-plugin').default;



export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
  //  path: '/src',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new ImageminPlugin({
      // disable: process.env.NODE_ENV !== 'production', // Disable during development
      pngquant: {
        quality: '60-70'
      }
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']},
      // {test: /\.jpg$/, loaders: ['images','jpg']}
    //  {test: /\.css$/, loaders: ['style','css']}
    {
      test: /\.(jpg|png|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[path]/images/[name].[ext]',
        },
      },
    ]
  }
  // var ImageminPlugin = require('imagemin-webpack-plugin').default;
// Or if using ES2015:
// import ImageminPlugin from 'imagemin-webpack-plugin'

// module.exports = {
//   plugins: [
//     // Make sure that the plugin is after any plugins that add images
//     new ImageminPlugin({
//       disable: process.env.NODE_ENV !== 'production', // Disable during development
//       pngquant: {
//         quality: '95-100'
//       }
//     })
//   ]
// }
}
