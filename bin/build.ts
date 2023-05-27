import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import workboxWebpackPlugin from 'workbox-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { resolve } from './utils'
import webpackConfig from './webpack.config'
// const BundleAnalyzer: any = BundleAnalyzerPlugin

const options: webpack.Configuration = webpackMerge(webpackConfig, {
  mode: 'production',
  output: {
    path: resolve('..', 'dist'),
    filename: 'js/[name].[contenthash:7].js',
    chunkFilename: 'js/[name].[id].js',
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          }
        ],
        exclude: resolve('..', 'node_modules')
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
        exclude: resolve('..', 'node_modules')
      },
      {
        test: /\.(png|gif|jpg|jpeg|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 0 * 1024,
          name: 'images/[name].[contenthash:7].[ext]'
        },
        exclude: resolve('..', 'node_modules')
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css',
      chunkFilename: 'css/[name].[id].css'
    }),
    // new workboxWebpackPlugin.GenerateSW({
    //   cacheId: 'webpack-pwa', // 设置前缀
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   runtimeCaching: [
    //     // 配置路由请求缓存
    //     {
    //       urlPattern: /.*\.js/, // 匹配文件
    //       handler: 'NetworkFirst' // 网络优先
    //     },
    //     {
    //       urlPattern: /\/api/, // 匹配文件
    //       handler: 'NetworkFirst' // 网络优先
    //     }
    //   ]
    // }),
    // new BundleAnalyzer({
    //   analyzerHost: 'localhost',
    //   analyzerPort: 3603,
    //   generateStatsFile: true
    // })
  ]
})

const compiler: webpack.Compiler = webpack(options)

compiler.run(() => {
  console.log('打包完成')
})
