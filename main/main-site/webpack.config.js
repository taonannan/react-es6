/* 参考 http:deshui.wang/%E6%8A%80%E6%9C%AF/2016/01/24/javascript-next-features-es6-in-browser/
   https://ponyfoo.com/articles/understanding-javascript-async-await
   https://babeljs.io/docs/usage/polyfill/
 */

var path = require('path');
var webpack = require('webpack');
var dev=process.env.NODE_ENV==='dev';

var platform=process.env.platform;
var port,files, static_main_name = "";


if(platform === 'api') {port = 5201; }
else if(platform === 'mobile') {port = 5101; static_main_name = "mobile_site";}
else {port = 5001; static_main_name = "pc_site";}

var glob = require("glob");

var filename=`config.${dev?'dev':'production'}.json`;

var config=require(`./${filename}`);


files = glob.sync(`./static/${static_main_name}/script/**/*.entry.js`);

function entry(name){
    if(dev){
        return [name];
    }
    return name;
}

function entries(files){
    var ret={};
    files.map((val) => {
        var name = '';
        if (val.indexOf('entry') > -1) {
            name=val.slice((`./static/${static_main_name}/script/`).length, 0 - '.entry.js'.length);
        } else {
            name=val.slice((`./static/${static_main_name}/script/`).length);
        }
        
        ret[name]=entry(val)
    });

    return ret;
}

function js_ugly(config, ugly){
    if(ugly===true || ugly==='true'){
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({compress:{warnings:false},output:{comments:false}}));
    }
}

var libraryPath = __dirname + `/static/${static_main_name}/script/library/`;

module.exports = {
    devtool: 'eval',
    resolve:{
        extensions:['', '.js', '.jsx'],
        alias: {
            'jquery-ui': "jquery-ui/jquery-ui.js",
            'moment':'moment/moment.js',
        }
    },
    entry: entries(files),
    output: {
        path: __dirname + (`/dist/static/${static_main_name}/script`),
        filename: '[name].js',
        publicPath: `/static/${static_main_name}/script/`
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel',
                query:{
                    "babelrc":false,
                    "presets": ["es2015", "stage-3"],
                    "plugins": [ "transform-runtime", "transform-function-bind", ["fast-async", {
			                  "env": {
				                    "augmentObject": false,
				                    "dontMapStackTraces": false,
				                    "asyncStackTrace": false,
				                    "dontInstallRequireHook": false
			                  },
			                  "compiler": {
				                    "promises": true,
				                    "generators": false
			                  },
			                  "runtimePattern":null
		                }], "transform-es3-property-literals", "transform-es3-member-expression-literals"]
                },
                exclude: /node_modules/,
            },
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'image?{bypassOnDebug: true, progressive:true, \
                        optimizationLevel: 3, pngquant:{quality: "65-80"}}',
                    'url?limit=10000&name=img/[hash:8].[name].[ext]',
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    devServer:{
        proxy: {
          "*": "http://localhost:" + (port-1)
        },
        port:port,
        publicPath: `/static/${static_main_name}/script/`,
        historyApiFallback: true,
        outputPath:path.join(__dirname,`dist`)
    }
};

js_ugly(module.exports,!dev);
