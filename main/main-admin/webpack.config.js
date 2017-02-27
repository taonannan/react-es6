var path = require('path');
var webpack = require('webpack');
var dev=process.env.NODE_ENV==='dev';
var glob = require("glob");

var files = glob.sync("./static/**/*.entry.js");

function entry(name){
    if(dev){
        return ['webpack-dev-server/client?http://localhost:4001',
                'webpack/hot/only-dev-server',
                name];
    }
    return name;
}

function entries(files){
    var ret={};
    files.map((val) => {
        var name=val.slice('./static/'.length, 0 - '.entry.js'.length);
        ret[name]=entry(val)
    });
    return ret;
}

module.exports = {
    devtool: 'eval',
    resolve:{
        extensions:['', '.js', '.jsx']
    },
    entry: entries(files),
    output: {
        path: __dirname+ '/dist/static/main',
        filename: '[name].js',
        publicPath: '/static/main/'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loaders: ['react-hot', 'babel?{"presets": ["es2015", "react", "stage-0", "stage-3"], "plugins": [ "transform-runtime", "syntax-async-functions", "transform-function-bind"]}'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        proxy: {
            "*": "http://localhost:4000"
        },
        port:4001,
        publicPath: '/static/main/',
        hot: true,
        historyApiFallback: true
    }
};
