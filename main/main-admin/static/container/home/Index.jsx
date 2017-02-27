import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from 'react-router';

export default class Index extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state={
           
        };
    }
    componentWillMount(){
        
    }

    componentWillReceiveProps(nextProps){
      
    }

    render() {
       return (
            <div className="content">
                我是首页
            </div> 
        )
    }
}
Index.contextTypes= { router: React.PropTypes.object.isRequired};
