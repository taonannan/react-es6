import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link,browserHistory } from 'react-router';
import api from '../api';
import moment from 'moment';

import Paginate from '../common/Paginate';
import {Dropdown,DropdownItem} from '../common/Dropdown';


export default class LaborUnionWelfare extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state={
           
        };
    }
    componentWillMount(){
        
    }
  
    componentDidMount(){
       
        

       
    }

    async doFetch(){
        var data = await api('/article/laborunion-welfare/list');
        
    }
    renderDataTable(data){
       
    }

    componentWillReceiveProps(nextProps){
      
    }

    clickFn(e,href){
        this.context.router.push({pathname:href})
    }
    pageTo(){

    }

    render() {
       return (
            <div className="content">
                <div className="box">
                    <div className="box-header">
                      <h3 className="box-title">数据列表</h3>
                    </div>
                    <div className="box-body">
                        <div className="dataTables_wrapper form-inline dt-bootstrap">
                            <div className="row">
                                <div className="col-sm-12">
                                  <table className="table table-bordered table-striped" style={{marginBottom:"6px"}}>
                                    <thead>
                                      <tr>
                                        <th>#</th>
                                        <th>Table heading</th>
                                        <th>Table heading</th>
                                        <th>Table heading</th>
                                        <th>Table heading</th>
                                        <th>Table heading</th>
                                        <th >操作</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>1</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td style={{padding:0}}>
                                            <Dropdown label="操作" click={this.clickFn.bind(this)}>
                                                <DropdownItem label="新增" href="/article/laborunion-welfare/edit" />
                                            </Dropdown>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                      </tr>
                                      <tr>
                                        <td>3</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                            </div>
                            <Paginate  data={{page:1, total:2}} onPageTo={::this.pageTo} />
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}
LaborUnionWelfare.contextTypes= { router: React.PropTypes.object.isRequired};
