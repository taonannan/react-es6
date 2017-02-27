'use strict';

import koa from 'koa';
var app=new koa();

app.use(require('koa-bodyparser')());
app.use(require('koa-logger')());
app.use(require('./db').default);
app.use(require('./create_auth').default);
import route from './route';
app.use(route.routes()).use(route.allowedMethods());

// app.use(async function (ctx,next){
// 	var {user,auth_list} = ctx.session;
// 	if(!user){
// 	    ctx.redirect('/login?next=/home');
// 	}else{
// 		await next();
// 	}
  
// });

require('./view').default(app);

export default app;

