import React from 'react';
import ReactDOM from 'react-dom';


export  class Dropdown extends React.Component {
	constructor(props, context){
        super(props, context);
    }
    onClickFn(href,fn,e){
    	console.log(href)
    	e.preventDefault();
    	if(href.indexOf("/")!=-1){
    		fn(e,href);
    	}
    }
    render(){
    	var {label,click,...props} = this.props;
    	var {href="javascript:void 0;"} = this.props.children.props;
    	console.log(this.props.children)
    	return (
    		<div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                操作
                <span className="caret"></span>
              </button>
              <ul onClick={this.onClickFn.bind(this,href,click)}  className="dropdown-menu" style={{minWidth:"80px"}} aria-labelledby="dropdownMenu1">
                {this.props.children}
              </ul>
            </div>
    	)
    }


}
export class DropdownItem extends  React.Component {
	constructor(props, context){
        super(props, context);
        
    }
    
    render(){
    	var {label,href="javascript:void 0;",separator} = this.props;
    	if(separator){
    		return (<li role="separator" className="divider"></li>)
    	}
    	if(!label){
    		return (<li></li>)
    	}
    	return (
            <li><a href={href}>{label}</a></li>
    	)
    }
}

export default {Dropdown,DropdownItem}
