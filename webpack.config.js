const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',


    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        publicPath: '/',
        clean: true,
    },


    resolve: {

        extensions: ['.tsx', '.ts', '.js'],

        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },


    module: {
        rules: [
            {

                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {

                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            api: 'modern',
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            api: 'modern',
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],

    // devServer: {
    //     static: {
    //         directory: path.join(__dirname, 'dist'),
    //     },
    //     port: 3001,
    //     hot: true,
    //     open: true,
    //     historyApiFallback: true,
    //     headers: {
    //         'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: http://localhost:* ws://localhost:* wss://localhost:* http://127.0.0.1:* ws://127.0.0.1:* wss://127.0.0.1:*; connect-src 'self' 'unsafe-inline' http://localhost:* ws://localhost:* wss://localhost:* http://127.0.0.1:* ws://127.0.0.1:* wss://127.0.0.1:*; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' 'unsafe-eval';",
    //     },
    //     setupMiddlewares: (middlewares, devServer) => {
    //         if (!devServer) {
    //             throw new Error('webpack-dev-server is not defined');
    //         }
    //         // Не применяем historyApiFallback к статическим файлам
    //         devServer.app.use((req, res, next) => {
    //             // Если это запрос к статическому файлу (JS, CSS, изображения и т.д.), пропускаем
    //             if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
    //                 return next();
    //             }
    //             res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: http://localhost:* ws://localhost:* wss://localhost:* http://127.0.0.1:* ws://127.0.0.1:* wss://127.0.0.1:*; connect-src 'self' 'unsafe-inline' http://localhost:* ws://localhost:* wss://localhost:* http://127.0.0.1:* ws://127.0.0.1:* wss://127.0.0.1:*; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' 'unsafe-eval';");
    //             next();
    //         });
    //         return middlewares;
    //     },
    // },

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3001,
        hot: true,
        open: true,
        historyApiFallback: true,
    },
};
