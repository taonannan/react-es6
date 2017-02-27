export default function apiver(ctx){
    ctx.apiver=ctx.request.header.apiver||'0.0.0';
}
