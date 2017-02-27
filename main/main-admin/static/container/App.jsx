import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import Navigation from './common/Navigation';

//路由
import router from './router';


require("react-tap-event-plugin")();



export default class App extends React.Component{
    render(){
        return (
            <Navigation>
                <Router history={browserHistory}>
                {router.map((item,index)=>{
                        return (<Route key={index} path={item.path} component={item.name}/>)
                    })
                }
                </Router>
            </Navigation>
        );
    }
}
