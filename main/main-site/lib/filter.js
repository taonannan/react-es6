import path from 'path';
import views from 'koa-views';
import {dev,mode,is_h5} from './config';

import {request} from './view';
import moment from 'moment';
var _ = require('lodash');

import dateFilter from 'nunjucks-date-filter';

export default function(env){

    env.addGlobal('moment', moment);

    env.addFilter('formatWeek', function(type){
        return {
           Monday:"周一",
           Tuesday:"周二",
           Wednesday:"周三",
           Thursday:"周四",
           Friday:"周五",
           Saturday:"周六",
           Sunday:"周日"
        }[type]
    });

    env.addFilter('sportTypeToText', function(type){
        return {
           BASKETBALL:"篮球",
           FOOTBALL:"足球",
           TABLE_TENNIS:"乒乓球",
           BADMINTON:"羽毛球",
           TENNIS:"网球",
           SWIMMING:"游泳",
           FITNESS:"健身",
           BILLIARDS:"台球",
           SQUASH:"壁球",
           TRAMPOLINE:"蹦床",
           CHILDREN_ACTIVITY:"儿童",
           ATHLETICS:"田径",
        }[type]
    });

    

    env.addFilter('json', function(str){
        return env.filters.safe(JSON.stringify(str));
    });

    env.addFilter('money', function(num){
        return env.filters.safe(
            num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        );
    });

    env.addFilter('money_int', function(num){
        return env.filters.safe(
            num.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        );
    });

    env.addFilter('iscurrentpath', function(name,className0,className1){
        let {url} = request,
            index = 0; // 查询问号的位置
        className1 = className1 || '';

        index = url.indexOf('?');

        url = index > -1 ? url.substring(0,index) : url;

        if (url) {
            return (name == '/' && name == url) || (name != '/' && url.indexOf(name) == 0) ? className0 : className1;
        } else {
            return '';
        }
    });

    //会员服务和关于我们左侧
    env.addFilter('leftbar_select', function(cur_url){
        let {url} = request;
        let result = url.indexOf(cur_url)>=0;
        return result?"active":""

    });

    env.addFilter('clear', function(obj){
        return "";
    });

    // 判断是否为某种类型
    // 支持string,array,object
    env.addFilter('isstring', function(obj,type){
        return typeof obj == 'string';
    });

    // 判断是否为数组
    env.addFilter('isarray', function(obj){
        return obj instanceof Array;
    });

    // 判断是否为null
    env.addFilter('isnull', function(obj){
        return obj == null;
    });

    // 截取长度
    env.addFilter('formatstringwithdot', function(string,length){
        if (string.length > length) {
            return string.substring(0,length) + '...';
        } else {
            return string;
        }
    });

   

    env.addFilter('moneyformat', function(amount,str) {
        let unit = '元';

        if (amount >= 10E3) {
            amount /= 10E3;
            unit = '万';
        } else if (amount >= 10E7){
            amount /= 10E7;
            unit = '亿';
        }

        amount = str == 'nodigital' ? amount.toString() : amount.toFixed(2);

        let number = env.filters.safe(
            amount.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        );
        return number.toString() + unit;
    });

    // 排序反转
    env.addFilter('reversedirection',function (string,order_by,type) {
        if (order_by != type) {
            return 'desc';
        } else {
            return string && string == 'desc' ? 'asc' : 'desc';
        }
    });

    env.addFilter('date', dateFilter);

    // 添加url参数
    env.addFilter('assignurlparams', function(path,params) {
        let {query} = request,
            option = _.merge({},query,params),
            queryString = '';

        for (var key in option) {
            queryString += '&' + key + '=' + option[key];
        }
        queryString = queryString.replace('&','?');

        return path + queryString;
    });

    // 如果参数大于1万，则返回x万，否则返回原值
    env.addFilter('moneywan', function(string) {
        if (isNaN(string)) {
            return string;
        }
        let number = parseFloat(string);

        return number >= 10E3 ? parseFloat(number/10E3) + '万' : number.toString();

    });



    // 获取银行卡后4位
    env.addFilter('getcardtail', function(cardno) {
        return typeof(cardno) == 'string' && cardno.length > 4 ? cardno.substr(cardno.length-4,4) : cardno;
    });

    env.addFilter('maskcardno', function(cardno) {
        return typeof(cardno) == 'string' && cardno.substr(0,4) + '******' + cardno.substr(cardno.length-4,4);
    });

    //身份证加密
    env.addFilter('maskidcard', function(idcard) {
        return typeof(idcard) == 'string' && idcard.substr(0,2) + '**************' + idcard.substr(idcard.length-2,2);
    });

    // 加密手机号
    env.addFilter('maskphone', function(phone) {
        return typeof(phone) == 'string' && phone.length == 11 ? (phone.substr(0,2) + '******' + phone.slice(-1)) : phone;
    });

    env.addFilter("handleExperienceDetail",function (str) {
     if(!str || !str.trim()) return '';
     let ary = JSON.parse(str);
     ary = ary.map(function (item,index,list) {
         return item.value
     });
     return env.filters.safe(ary.join(''));
    });

    env.addFilter('strToJSONObj',function (str) {
     return JSON.parse(str);
    });

    env.addFilter('join',function(str,sep1,sep2){
        var coll = str.split(sep1);
        coll =  _.filter(coll,function(ele){return ele != ''})|| [];
        return coll.join(sep2);
    })
     env.addFilter('split',function(str,separater){
       return str.split(separater)
    })


    env.addFilter('parseInt',function(num) {
        return parseInt(num);
    })

    env.addFilter('parseFloat',function(num) {
        return parseFloat(num);
    })



    env.addFilter('last4',function(str){
       var len = str && str.length || 0;
        if(len > 4){
            return str.slice(len-4);
        }else{
            return str;
        }
    });

    env.addFilter('format_login_url',function(uri){
        let redirectUrl =  encodeURIComponent(uri);
       return `/login?t=${redirectUrl}`;
    });


    //去除html标签
    env.addFilter('deleteHtml',function(content){
       return content.replace(/<\/?[^<>]*>/g,"").replace(/&nbsp;/g,"");
    });

    //encodeURIComponent 加密
    env.addFilter('encodeURIComponent',function(str) {
        return encodeURIComponent(str);
    })

};














