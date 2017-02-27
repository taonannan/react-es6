import version_cmp from 'semver-compare';

class Version{
    constructor(middleware){
        this.default=middleware;
        this.versioning=[];
        this.sorted_versioning=null;
        this.min_version='0.0.0';
    }
    lt(version, middleware){
        this.versioning.push({version, middleware});
        return this;
    }
    min(version){
        this.min_version=version;
    }
    async middleware(ctx, next){
        var apiver=ctx.apiver||'0.0.0';
        if(version_cmp(this.min_version, apiver)>0){
            ctx.response.status=426;
            ctx.body={error:{name:'apiver', msg:'当前客户端版本过低，请升级'}};
            return;
        }
        if(!this.sorted_versioning){
            this.sorted_versioning=this.versioning.sort((a, b)=>{
                return version_cmp(a.version, b.version);
            });
        }
        var middleware0=this.default;
        for(var item of this.sorted_versioning){
            if(version_cmp(item.version, apiver)>-1){
                middleware0=item.middleware;
                break;
            }
        }
        await middleware0(ctx, next);
    }
}

export default function apiver(router, path, middleware){
    let api=new Version(middleware);
    router.post(path, ::api.middleware);
    return api;
}
