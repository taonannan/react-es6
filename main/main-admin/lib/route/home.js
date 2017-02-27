import SQL from 'sql-template-strings';
import asyncBusboy from '../common/parsefile';
import ByteBuffer from 'bytebuffer';
import db from 'mime-db';
import fs from 'fs';
import dateFormat from 'dateformat';

var router = require('koa-router')();



router.post('/get',auth_middleware_path(auth_activity.edit),async (ctx, next)=>{
    var {id} = ctx.request.body;
    var [activity] = await ctx.mysql.query(SQL`select * from lxs_activity.activity where id = ${id}`);
    ctx.body = {activity};
});




export default router;
