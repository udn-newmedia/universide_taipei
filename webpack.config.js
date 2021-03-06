const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

let prod_state = process.env.NODE_ENV==="production"

module.exports = {
    entry: {
        bundle: './src/index.js',
        gymnastics: './src/gymnastics.js',
        fencing: './src/fencing.js',
        jquery: ["jquery"],
        fullpagejs: ['fullpage.js'],
        lazysizes: ['lazysizes']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    module:{
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: {importLoader: 1 }},
                        'postcss-loader'
                    ],
                    publicPath: '../'
                }),
                test: /\.css$/
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg)$/,
                loaders: [
                    'file-loader?limit=10000&hash=sha512&digest=hex&name=image/[hash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            bypassOnDebug: true,
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 4,
                            },
                        },
                    }
                ],
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new webpack.LoaderOptionsPlugin({
            debug: !prod_state,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["chunk","lazysizes", "fullpagejs", 'jquery'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            chunks: ['jquery', 'fullpagejs', 'lazysizes', 'chunk', 'bundle'],
            chunksSortMode: 'manual'
        }),
        new HtmlWebpackPlugin({
            template: 'src/gymnastics.html',
            filename: 'gymnastics.html',
            chunks: ['jquery', 'fullpagejs',  'lazysizes', 'chunk', 'gymnastics'],
            chunksSortMode: 'manual'
        }),
        new HtmlWebpackPlugin({
            template: 'src/fencing.html',
            filename: 'fencing.html',
            chunks: ['jquery', 'fullpagejs', 'lazysizes', 'chunk', 'fencing'],
            chunksSortMode: 'manual'
        }),
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].[contenthash].css'
        })
    ]
}