'use strict';

import koa from 'koa';

var app=new koa();

app.keys = ['project main-site secret', 'stronger the song'];

// var winston=require('winston');

var available_code_map=new Map(new Set([400, 401, 403, 404, 500]).entries());
app.use(async (ctx, next)=>{
  try{
    await next();
  }catch(err){
    if(!(err && err.statusCode)){
      // winston.error({err, ctx:JSON.stringify(ctx)});
    }
    var code=available_code_map.get(err ? err.statusCode: 500)|| 500;
    ctx.response.status=code;
    await ctx.view(`error/${code}`, {code, url:ctx.request.url});
  }
});
app.use(require('koa-bodyparser')());
app.use(require('koa-logger')());

// require('./middleware').default(app);

require('./view').default(app);

require('./route').default(app);

//require('./dev').default(app);

export default app;
