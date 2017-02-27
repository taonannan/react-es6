var util = require('util');
var dir = 'static/';
// var config = require('./lib/config');
var platform = process.env.platform;

dir += platform == 'mobile' ? 'mobile_site' : 'pc_site';

// dir += 'mobile_site';

var pc_dir_arry = ['icons'];
var option = {};
var option_arr = [];
for (var i = 0;i < pc_dir_arry.length;i++) {
    option = {
      src: `./${dir}/images/images/uicons/**/*.{png,gif,jpg}`,
      destImage: `./dist/${dir}/images/images/uicons.png`,
      destCSS: `./dist/${dir}/style/generated/uicons.css`,
      imgPath: `/${dir}/images/images/uicons.png`,
      cssTemplate:'handlebarsStr.css.handlebars',
      cssOpts: {
        cssClass: function (item) {
          //return util.format('.%s', item.name);
        },
      }
    };

    var name = pc_dir_arry[i];
    option.src = `./${dir}/images/images/${pc_dir_arry[i]}/**/*.{png,gif,jpg}`;
    option.destImage = `./dist/${dir}/images/images/${pc_dir_arry[i]}.png`;
    option.destCSS = `./dist/${dir}/style/generated/${pc_dir_arry[i]}.css`;
    option.imgPath = `/${dir}/images/images/${pc_dir_arry[i]}.png`;
    option_arr.push(option);
}

console.log(option_arr);

module.exports = option_arr;
