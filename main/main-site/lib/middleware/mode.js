import config, {mode, is_h5, is_api} from '../config';

export default async function mode(ctx, next){
    ctx.mode=mode;
    ctx.is_h5=is_h5;
    ctx.is_api=is_api;
    await next();
}
