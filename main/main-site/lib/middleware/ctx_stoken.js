const sessionid = 'sessionid';
const acctid = 'acctid';


export default function stoken(ctx, mode) {
    if (mode !== 'api') {
        Object.defineProperty(ctx, 'stoken', {
            get: () => {
                return ctx.cookies.get(sessionid, {
                    signed: true,
                    httpOnly: true
                });
            },
            set: (value) => {
                ctx.cookies.set(sessionid, value, {
                    signed: true,
                    httpOnly: true
                });
            }
        });
        Object.defineProperty(ctx, 'acctid', {
            get: () => {
                return ctx.cookies.get(acctid, {
                    signed: true,
                    httpOnly: true
                });
            },
            set: (value) => {
                ctx.cookies.set(acctid, value, {
                    signed: true,
                    httpOnly: true
                });
            }
        });



    } else {
        Object.defineProperty(ctx, 'stoken', {
            get: () => {
                return ctx.request.body.stoken;
            }
        });
    }

    var session;
    ctx.sess = async(session0) => {
        if (session0) {
            session = session0;
            let {
                stoken
            } = session;
            ctx.stoken = stoken;
        }
        
        return session;
    }
}
