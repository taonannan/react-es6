import serve from 'koa-static';
import path from 'path';
import nunjucks from 'nunjucks';
import views from 'koa-views';
import mount from 'koa-mount';
import dateFilter from 'nunjucks-date-filter';
import {dev,is_h5,is_api,mode} from './config';
import pagelet from './ext/pagelet';

let static_main_name = '';
let publicDir = '';

export var request = {path:''};

if(is_h5() || is_api()){
    static_main_name = "mobile_site";
}else{
    static_main_name = "pc_site";
}

export var  view_path=path.resolve(__dirname, `../static/${static_main_name}/html`);
publicDir = `/static/${static_main_name}`;

var nunjucks_env = nunjucks.configure(view_path, { autoescape: true , watch:true});

// 配置 pagelet
pagelet.configure({
  root: view_path,
  manifest: path.join(view_path, 'manifest.json'),
  cache: true
});

// 注册 Tag 到 nunjucks
pagelet.register(nunjucks_env);
require("./filter").default(nunjucks_env);
require("./tag").default(nunjucks_env);

export default function(app){
    app.use(serve(__dirname+ '/'+ '../dist'));
    app.use(mount(`/static/${static_main_name}/script`, serve(__dirname+ '/'+ '../node_modules/jquery/dist')));
    app.use(mount('/static', serve(__dirname+ '/'+ '../static')));
    app.use(views(view_path, {
        extension:'tpl',
        cache:false,
        map: { tpl: 'nunjucks'}
    }));
    
    app.use(async (ctx, next)=>{
        request = ctx.request;
        let {query:{_adv}} = request;
        if(_adv){
            ctx._adv=_adv;
        }
        ctx.view=async function(tpl, data){
          
            tpl=tpl+'.tpl';
            var session={};
            if(ctx.sess){
                session=await ctx.sess()
            }

            var view_context=ctx.__view||{};
            return await ctx.render(tpl, {...view_context, ...data, _csrf:ctx.csrf, session, publicDir});
        };

        await next();
    });
}
