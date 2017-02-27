var router = require('koa-router')();



router.get('/', async (ctx, next)=>{
    await ctx.view('home/index');
});

export default router;
