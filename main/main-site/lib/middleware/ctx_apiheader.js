export default function apiheader(ctx) {
    let device = ctx.request.header.device;
    if (device) {
        ctx.device = device;
        ctx.is_api = true;
    }
}
