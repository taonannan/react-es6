function Util (){};

//获取url参数函数
Util.prototype.getUrlParams = function(url){
	url = url||location.href;
	var obj ={},reg = /([^?=&#]+)=([^?=&#]+)/g;

    decodeURIComponent(url).replace(reg,function(){
        obj[arguments[1]] = arguments[2];
    });
    return obj;
};

//获得参数类型
Util.prototype.getType = function (target) {
    return  Object.prototype.toString.call(target).replace(/^\[object ([a-zA-Z]+)\]$/,"$1").toLowerCase();
}

module.exports=  new Util();

