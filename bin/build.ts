import webpack, { Compiler, Configuration, DefinePlugin } from "webpack"
import merge from "webpack-merge"
import miniCssExtractPlugin from "mini-css-extract-plugin"
import { resolve, configs } from "./webpack.config"

const argv = process.title
let isMode: boolean = false
if (argv.search('build:ssr') > -1) {
    isMode = true
    process.env.mode = 'ssr'
}

const options: Configuration = merge({
    mode: "production",
    entry: {
        'react.app': resolve('..', `src/entry/${isMode ? 'server' : 'client'}.tsx`),
        'react.js': ["react", "react-dom"],
        'react.router': ["react-router-dom"]
    },
    output: {
        path: resolve('..', `dist/${isMode ? 'server' : 'client'}`),
        filename: 'js/[name].[contenthash:7].js',
        chunkFilename: 'js/[name].[id].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader
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
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                mode: 'local',
                                localIdentName: '[name][local]-[hash:base64:5]',
                                localIdentContext: resolve('..', 'src'),
                                exportGlobals: true,
                            }
                        }
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
                test: /\.(png|gif|jpg|jpeg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[contenthash:7][ext]' // 局部指定输出位置
                }
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: 'css/[name].[contenthash:7].css',
            chunkFilename: 'css/[id].[contenthash:7].css'
        }),
        new DefinePlugin({
            'process.env.mode': JSON.stringify(isMode ? 'ssr' : 'csr')
        })
    ]
}, configs)

const compiler: Compiler = webpack(options)

compiler.run((err) => {
    console.log(err)
})