// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  webpack: (config, { dev }) => {

    // config.node = {
    //   fs: 'empty'
    // }

    config.plugins.push(
      new webpack.EnvironmentPlugin(localEnv)
    )

    // Perform customizations to webpack config
    console.log(config.module.rules)

    config.module.rules.push({
      exclude: [/node_modules/, /\.next/],
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [["next/babel"]],
            // plugins: [require('@babel/plugin-transform-object-rest-spread')]
          }
        }
      ]
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader', options: {
            includePaths: ['./node_modules', './node_modules/grommet/node_modules', './static/scss']
          }
        }
      ]
    });
    // Important: return the modified config
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    config.alias = config.alias || {}
    config.alias['react-virtualized/List'] = 'react-virtualized/dist/es/List';
    config.alias['react-virtualized/AutoSizer'] = 'react-virtualized/dist/es/AutoSizer';
    // Important: return the modified config
    return config
  }
}
