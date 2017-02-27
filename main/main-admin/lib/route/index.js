import article from "./article"

var router = require('koa-router')();

router.use('/article', article.routes(), article.allowedMethods());


export default router;
