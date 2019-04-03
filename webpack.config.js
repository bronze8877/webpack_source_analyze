// webpack内部又一个事件流,tapable 1.0
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
let cssExtract =  new ExtractTextPlugin('css/css.css')
let lessExtract =  new ExtractTextPlugin('css/less.css')
module.exports = {
    // entry 配置方法， 字符串，数组,对象（多入口）
    // 从入口，找到依赖模块，然后生成chunk(代码块),最后把chunk写到文件系统中(assets)
    entry: {
    //    index: './src/index.js',
    //    base: './src/base.js',
    //    //vender: 'jquery'
    //    common: './src/common.js'
        index: './src/main.js',

    },
    resolve: {
        mainFields: ['main','browser','node'],
        modules: [path.resolve('node_modules'), path.resolve('lib')],
        extensions: [".js", ".json   "],
        alias: {
            "bootstrap": 'bootstrap/dist/css/bootstrap.css'
        }

    },
    output: {
         path: path.join(__dirname,'./dist'),
         filename: '[name].[hash].js'
    },
    watch: true, // 监控源文件变化，源文件改变后，重新打包
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000 ,// 每秒钟轮询次数
        aggregateTimeout: 500 // 修改多少时间后在编译
    },
    //devtool: 'source-map', // 调试用  'eval-source-map'
    module:{
        // 不需要递归解析此模块
        //noParse: /react\.production\.min\.js/,
        rules:[
            // {
            //     test: require.resolve('jquery'),
            //     use:{
            //         loader: 'expose-loader', 
            //         option: '$'
            //     }   
            // },
            // 把路径的原始地址，转变为打包后的引用地址
            {
                test: /\.jpg$/,
                loader: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'image/'
                    }
                }    
            },
            {
                test: /\.css$/,
                // css-loader 解析处理css中的url路径，把css文件变成一个模块
                // style-loader 负责把css文件变成style标签插入head中
                // loader:["style-loader","css-loader","postcss-loader"] 
                // loader三种写法
                //  use:{loader: 'expose-loader', option: '$'}
                use: cssExtract.extract(['css-loader', 'postcss-loader'])
                // 缩小查找范围
                // include: './src/'.
                // exclude: '/node_modules/'
            },
            {
                test: /\.less$/,
                // css-loader 解析处理css中的url路径，把css文件变成一个模块
                // style-loader 负责把css文件变成style标签插入head中
                //loader:["style-loader","css-loader","less-loader"] 
                // loader三种写法
                //  use:{loader: 'expose-loader', option: '$'}
                use: lessExtract.extract(['css-loader', 'less-loader'])
                  
            },

            //url-loader 再图面比较小的时候，直接变成base64字符串嵌入页面中
            // {
            //     test: /\.jpg$/,
            //     loader: {
            //        loader: 'url-loader',
            //        options: {
            //            limit: 5 * 1024
            //        }
            //     }    
            // },
            // html中有img src的时候使用
            // {
            //     test: /\.(htm|html)$/i,
            //     loader: 'html-withimg-loader'
            // }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.ProvidePlugin({
        //     '$': 'jquery'
        // }),
        new HtmlWebpackPlugin({
            template: './template.html',
            filename: 'index.html',
            hash: true,
            // chunk:['common'],
            title: 'daydayup ggb',
            minify: {
                removeAttributeQuotes: true
            }
        }),
        cssExtract,
        lessExtract
    ],
    devServer: {
        port: 8888,
        open: true,
        hot: true,
        host: 'localhost'
        
    }
}