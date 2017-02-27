import {dev} from './config';
import {view_path} from './view';
import merge from 'merge';

var fs = require("fs");
var Promise = require("bluebird");
fs=Promise.promisifyAll(fs);

var router = require('koa-router')();

router.get('/:path*', async (ctx, next)=>{
    var path=ctx.params.path||'index';
    var html_path=`${view_path}/${path}.html`;
    var result =await fs.statAsync(html_path);
    if(result.isFile()){
        var json_path=`${view_path}/${path}.json`;
        var content;
        try{
            content=await fs.readFileAsync(json_path, "utf8");
            content=JSON.parse(content);
        }catch(e){
        }
        var js_path=`${view_path}/${path}.js`;
        try{
            var js_stat=await fs.statAsync(html_path);
            if(js_stat.isFile()){
                var js=require(js_path);
                if(js.default){
                    if(typeof(js.default)==='function'){
                        content=js.default();
                    }else{
                        content=js.default;
                    }
                }else{
                    content=js;
                }
            }
        }catch(e){
        }
        content=content||{};
        var {querystring}=ctx.request;
        if(querystring){
            try{
                var querystring=decodeURIComponent(querystring);
                var diff=JSON.parse(querystring);
                if(diff){
                    content=merge.recursive(true, content, diff);
                }
            }catch(e){
                console.log('####js 解析失败', querystring, e);
            }
        }
        await ctx.view(path, content);
    }else{
        await next();
    }
});

export default function usedev(app){
    if(dev){
        app.use(router.routes()).use(router.allowedMethods());
    }
}
