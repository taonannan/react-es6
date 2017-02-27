import session, {
    Store
} from "koa-session2";
import Redis from "ioredis";
import fs from 'fs';
import auth_constant from './auth_constant';

const compose = require('koa-compose');
var EXPIRES = 2*60*60*1000;
function read_json(file_path) {
    try {
        fs.accessSync(file_path, fs.R_OK);
        var data_str = fs.readFileSync(file_path, "utf8");
        return JSON.parse(data_str);
    } catch (e) {
        /* console.log(file_path);
         * console.log(e);*/
    }
}

function load_auth_by_path(path) {
    path = path.endsWith('/') ? path.substr(0, path.length - 1) : path;
    var index = read_json(`${path}/index.json`);

    if (index) {
        for (var key in index) {
            var data = read_json(`${path}/${key}.json`);
            if (data) {
                index[key] = data;
            }
        }
    }
    return index;
}

function auth_data_norm(children, path) {
    for (var child in children) {
        var auth = children[child];
        var key = `${path}/${child}`;
        if (typeof(auth) === 'string') {
            children[child] = {
                name: auth,
                key
            };
        } else {
            children[child].key = key;
            auth_data_norm(auth.children, key);
        }
    }
}
var auth_data;

function load_auth() {
    if (!auth_data) {
        auth_data = load_auth_by_path('./config') || load_auth_by_path(`${__dirname}/config`);
        auth_data_norm(auth_data, '');
    }
    
    return auth_data;
}

export var auth_map = load_auth();

function auth_or_not(auth_list, path) {
    if (!auth_list) {
        auth_list = [];
    }
    
    var  pathType=Object.prototype.toString.call(path)=='[object Array]';
    for (var auth of auth_list) {
        if(pathType){
            if(path.indexOf(auth)!=-1){
                return true;
            }
        }else if(auth === path ){
            return true;
        }
        
    }
    return false;
}

class RedisStore extends Store {
    constructor(url) {
        super();
        this.redis = new Redis(url);
    }

    async get(sid) {
        return JSON.parse(await this.redis.get(`SESSION:${sid}`));
    }

    async set(session, opts) {
        if (!opts.sid) {
            opts.sid = this.getID(24);
        }
        // await this.redis.set(`SESSION:${opts.sid}`, JSON.stringify(session));
        await this.redis.multi().set(`SESSION:${opts.sid}`, JSON.stringify(session)).expire(`SESSION:${opts.sid}`,EXPIRES).exec(function (err) {});
        return opts.sid;
    }

    async destroy(sid) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}

async function login_middleware(ctx, next) {

    ctx.login = (user, auth_list) => {
        ctx.session = {
            user,
            auth_list
        };
        ctx.session.maxAge= EXPIRES;
    };
    ctx.logout = () => {
        ctx.session = {};
    };
    ctx.auth_list = () => {
        return ctx.session.auth_list;
    }
    await next();
}

async function auth_middleware(ctx, next,auth_path) {
    var {
        method,
        path
    } = ctx.request;
    path = auth_path ||path;
    var {
        user,
        auth_list
    } = ctx.session;
    var auth = true;
    if (method === 'POST') {
        auth = auth_or_not(auth_list, path);
    }
    if (auth) {
        await next();
    } else {
        ctx.throw(401);
    }
}
function auth_middleware_path(path){
    return async function(ctx,next){
      await auth_middleware(ctx,next,path);
    }
}

export function create_session(redis_url) {
    return session({
        key: "SESSIONID",
      store: new RedisStore(redis_url)
    });
}

export  function create(redis_url) {
  return compose([create_session(redis_url), login_middleware, auth_middleware,auth_middleware_path]);
}

export function create_login(redis_url) {
    var ret = compose([create_session(redis_url), login_middleware]);
    ret.auth_middleware = auth_middleware;
    ret.auth_middleware_path = auth_middleware_path;
    ret.auth_constant = auth_constant;
    return ret;
}

export function auth_filter(redis_url){
  var rt = compose([create_session(redis_url),login_middleware]);
  rt.auth_middleware = auth_middleware;
  rt.auth_middleware_path = auth_middleware_path;
  rt.auth_constant = auth_constant;
  return rt;
}
export default {create_session,create,create_login,auth_map,auth_filter}
