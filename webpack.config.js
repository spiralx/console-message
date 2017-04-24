const { join, resolve } = require('path')

const webpack = require('webpack')
const { TsConfigPathsPlugin, CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// ----------------------------------------------------------------------------

const libraryName = 'console.message'
const libraryVar = 'ConsoleMessage'


const env = process.env.NODE_ENV || 'development'
const port = process.env.npm_package_config_devPort || 4444

const dev = env === 'development'
const prod = env === 'production'


// ----------------------------------------------------------------------------

const plugins = [
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks: Infinity,
  //   filename: 'vendor.bundle.js'
  // }),

  new webpack.EnvironmentPlugin({
    NODE_ENV: nodeEnv,
  }),

  // new webpack.NamedModulesPlugin(),

  new CheckerPlugin(),

  new TsConfigPathsPlugin(),

  new HtmlWebpackPlugin({
    inject: true,
    title: libraryName,
    filename: 'index.html',
    template: join(__dirname, 'template/index.html'),
    hash: true,
    chunks: [ 'common', 'index' ]
  })
]

if (dev) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
} else if (prod) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })
  )
}


// ----------------------------------------------------------------------------

const entry = []

if (dev) {
  // 'react-hot-loader/patch',
  entry.push(`webpack-dev-server/client?http://localhost:${port}`)
  // bundle the client for webpack-dev-servers and connect to the provided endpoint
  entry.push('webpack/hot/only-dev-server')
}

entry.push(join(__dirname, 'src/index.ts'))

// const entry = dev
//   ? [

//       `webpack-dev-server/client?http://localhost:${port}`,

//       'webpack/hot/only-dev-server',
//       // bundle the client for hot reloading
//       `./src/index.ts`
//     ]
//   : join(__dirname, 'src/index.ts')


// ----------------------------------------------------------------------------

module.exports = {
  devtool: prod
    ? 'source-map'
    : 'eval',

  // entry: {
  //   index: entry
  // },

  entry,

  output: {
    path: resolve(__dirname, 'dist'),
    filename: `${libraryName}.js`,
    sourceMapFilename: `${libraryName}.js.map`,
    libraryTarget: 'umd',
    library: libraryVar,
  },

  resolve: {
    extensions: [ '.ts', '.js' ]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader'
        ]
      }
    ]
  },

  plugins,

  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    hot: true,
    port,
    publicPath: '/'
  }
}
