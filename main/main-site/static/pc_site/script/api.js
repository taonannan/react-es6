import 'jquery-form';

module.exports= function api(url, request){
    return new Promise((resolve, reject)=>{
        var $request=$(request);
        if($request.is('form')){
            $request.ajaxSubmit({
                url,
                type:'POST',
                success:(data)=>{
                    resolve(data);
                }
            });
        }else{
            $.ajax({
                url,
                data:request,
                type:'POST',
                success:(data)=>{
                    resolve(data);
                }
            })
        }
    });
}
