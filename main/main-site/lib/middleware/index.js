import {
    is_api
}
from '../config';
import mode from './mode';
import ctx_http_info from './ctx_http_info';
import ctx_apiver from './ctx_apiver';
import ctx_stoken from './ctx_stoken';
import ctx_apiheader from './ctx_apiheader';
import {
    ctx_csrf, ctx_assert_csrf
}
from './ctx_csrf';

export default function index(app) {
    app.use(mode);
    app.use(async(ctx, next) => {
        ctx_http_info(ctx);
        if (is_api()) {
            ctx_apiver(ctx);
            ctx_apiheader(ctx);
          ctx_stoken(ctx , "api");
        } else {
            ctx_stoken(ctx);
            ctx_csrf(ctx);
            ctx_assert_csrf(ctx);
        }
        await next();
    });
}
