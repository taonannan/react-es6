import moment from 'moment';
export async function login_required(ctx, next){
    var session=await ctx.sess();
    if(session && session.user){
        await next();
    }else{
        ctx.throw(401);
    }
}


export default {login_required};
