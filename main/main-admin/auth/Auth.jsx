import React from 'react';
import ReactDOM from 'react-dom';
import auth_constant from "./auth_constant";
var cookie = require('cookie');
export  function Auth(props){
    var {path, children}=props;
    if(!path){
        if(Array.isArray(children)){
            children=children[0];
        }
        if(typeof(children)==='object'){
            var {href:path, to}=children.props||{};
            path=path || to;
        }
    }
    if(path){
        if(children && typeof(children)==='object' && typeof(children.props)==='object'){
            if(!Auth.isok(path)){
                //生成的标签如果是a 标签，不支持disabled， 就需要这个style
                var style=Object.assign({pointerEvents:'none'}, children.props.style);
                children=React.cloneElement(children, {disabled:true, style});
            }
        }
    }
    return children;
}
function auth_or_not(auth_list, path){
    path=path.endsWith('/')? path.substr(0, path.length-1):path;
    for(var auth of auth_list){
        // if(auth===path || path.startsWith(auth+'/')){
        //     return true;
        // }
        if(auth===path ){
            return true;
        }
    }
    return false;
}
Auth.isok=function(path){
    var {auth_list}=cookie.parse(document.cookie);
    try{
        auth_list=JSON.parse(auth_list);
        return auth_or_not(auth_list, path);
    }catch(e){}
    return false;
}
Auth.auth_constant =auth_constant;

export default {Auth};
