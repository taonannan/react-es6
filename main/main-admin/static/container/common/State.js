var objectPath = require("object-path");

export function setter(path){
    var self=this;
    return function(e, index, value){
        var {checked, type}=e.target;
        if(typeof(value)==='undefined'){
            value=e.target.value;
        }
        if(type==='radio' || type==='checkbox'){
            value=checked;
        }
        var state=self.state||{};
        objectPath.set(state, path, value);
        self.setState(state);
    };
}

export function bind_change(path, defaultValue){
    var value=objectPath.get(this.state, path);
    if(typeof(defaultValue)!='undefined'){
        value=defaultValue||"" ;

    }
    value = value||"";
    return {
        value,
        onChange:this::setter(path)
    };
}
export function bind_toggle(path, defaultValue){
    var value=objectPath.get(this.state, path);
    if(typeof(defaultValue)!='undefined'){
        value=defaultValue;
    }
    return {
        defaultToggled:!!value,
        onToggle:this::setter(path)
    };
}

export default {setter, bind_change, bind_toggle};
