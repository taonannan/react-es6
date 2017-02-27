/* 这个地方使用home作为router，是因为home中的get('/'),如果外层还有router的话，导致get('/')拦截了所有请求*/
import router from './home';





[].map((item)=>{
    router.use(item.routes());
    router.use(item.allowedMethods());
});

export default router;
