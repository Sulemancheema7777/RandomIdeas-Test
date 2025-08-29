// this uses commonjs style exports

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development', // set to 'production' for production builds
    entry: './src/index.js', // entry point of the application
    output: {
        path: path.resolve(__dirname, '../public'), // output directory
        filename: 'bundle.js' // output file name
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../public'), // directory to serve files from
        },
        port: 3000, // port number for the dev server
        open: true, // open the browser after server had been started
        hot: true, // enable hot module replacement
        compress: true, // enable gzip compression
        historyApiFallback: true, // serve index.html for all 404 routes (useful for SPAs)
    },
    module: {
        rules: [
            {
                test: /\.css$/, // regex to match CSS files
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // loaders to handle CSS files
            },
            {
                test: /\.js$/, // regex to match JS files
                exclude: /node_modules/, // exclude node_modules directory
                use: {
                    loader: 'babel-loader', // use Babel loader for transpiling JavaScript
                    options: {
                        presets: ['@babel/preset-env'] // preset for compiling ES6+ down to ES5
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App', // title of the HTML document
            filename: 'index.html', // output HTML file
            template: './src/index.html' // template file to use
        }),
        new MiniCssExtractPlugin()
    ],
}