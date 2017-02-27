import asyncBusboy from 'async-busboy';
import fs from 'fs';
import mime from 'mime-types';
var router = require('koa-router')();


router.get('/resource/:path',async(ctx,next)=>{
    var filePath  = ctx.params.path;
    var rePattern = new RegExp(/([A-Za-z0-9]+)([a-z0-9_@]*)\.(.+)/i);
    var arrMatches = filePath.match(rePattern);
    var resource;

    if(arrMatches == null){
        resource = await FileService.getObject({path: filePath});
    } else{
        var fileUniquePath= arrMatches[1]+'.'+arrMatches[3];

        var imageParams = arrMatches[2];


        var markMatch =  imageParams.match(/.*m(\d+).*/);
        var widthMatch = imageParams.match(/.*w(\d+).*/);
        var qualityMatch = imageParams.match(/.*q(\d+).*/);
        var requestMap = {path: fileUniquePath};
        if (markMatch != null && markMatch[1] != null){
            requestMap['watermark'] = true;
        }

        if (widthMatch != null && widthMatch[1] != null){
            requestMap['width'] = parseInt(widthMatch[1]);
        }

        if (qualityMatch != null && qualityMatch[1] != null){
            requestMap['quality']=parseInt(qualityMatch[1]);
        }

        resource = await FileService.getObject(requestMap);
    }

    ctx.set('Content-Length',resource.content.length);
    //var filename = 'attachment; filename=' + resource.name;
    //ctx.set('Content-disposition', filename);

    ctx.set('Content-Type',mime.contentType(resource.type));
    ctx.body = resource.content;
});


export default router;
