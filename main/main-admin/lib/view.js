import mount from 'koa-mount';
import serve from 'koa-static';
import sendfile from 'koa-sendfile';
import path from 'path';

import {dev} from './config';


var view_path=path.resolve(__dirname, '../static/');

var router = require('koa-router')();



router.use("*",async function(ctx,next){
	await next();
})

router.redirect('/', '/article/laborunion-welfare/list');
router.get('/home',sendFileIndex);
router.get('/test/:path*',sendFileIndex);
router.get('/article/:path*',sendFileIndex);

async function sendFileIndex(ctx, next){
	await sendfile(ctx, `${view_path}/index.html`);
}





export default function(app){
    app.use(serve(__dirname+ '/'+ '../dist'));
    app.use(router.routes()).use(router.allowedMethods());
}
