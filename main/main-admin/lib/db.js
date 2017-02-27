import config from './config';

var mysql = require('promise-mysql');
let SQL = require('sql-template-strings');
SQL.merge=function(...args){
    var ret=args.reduce(
        (ret, item)=>{
            if(item){
                ret.sql+=' '+item.sql;
                ret.text+=' '+item.text;
                ret.values=[].concat.call(ret.values, item.values);
            }
            return ret;
        },
        SQL``);
    return ret;
}
var cfg =Object.assign({
    connectionLimit: 10,
    typeCast:function(field, next){
        if (field.type == "TINY" && field.length == 1) {
            var bit = field.string();
            return bit=='1';
        }
        return next();
    }
}, config('db', true));

var pool = mysql.createPool(cfg);

export default async function(ctx, next){
  ctx.mysql=pool;
  await next();
}
