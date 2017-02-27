import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from 'react-router';
import { bind_change} from '../common/State';

export default class LaborUnionWelfareEdit extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state={
            title:""
        };
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        $('#datepicker').datepicker({
          autoclose: true,
          format:'yyyy-mm-dd'
        });
         this.editor = CKEDITOR.replace('editor1');
         CKEDITOR.filebrowserUploadUrl="/abda";
         this.editor.setData("<p>杜慧杰</p>")
        
    }

    componentWillReceiveProps(nextProps){
      
    }
    save(){
        var {title} = this.state;
        var article = {
            title,
            date:this.refs.date.value,
            content:this.editor.getData()
        }
        console.log(article);
        alert(JSON.stringify(article));
    }

    render() {
       return (
            <div className="content">
                <div className="box">
                    <div className="box-header">
                      <h3 className="box-title">文章新增</h3>
                    </div>
                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-6" >
                                <div className="form-group">
                                    <label>标题:</label>
                                    <input type="text" {...this::bind_change('title')} className="form-control" id="exampleInputEmail1" placeholder="标题" />
                                </div>
                                <div className="form-group">
                                    <label>发布日期:</label>
                                    <div className="input-group date">
                                      <div className="input-group-addon">
                                        <i className="fa fa-calendar"></i>
                                      </div>
                                      <input type="text" ref="date" className="form-control pull-right" id="datepicker" />
                                    </div>
                                </div>
                                
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>内容:</label>
                                    <textarea id="editor1" ref="content" name="editor1" defaultValue="" rows="10" cols="80" style={{visibility:"hidden", display: "none"}}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{textAlign:"center"}}>
                                <div className="btn-group" role="group"  >
                                    <button type="button" className="btn btn-default" onClick={()=>this.context.router.push({pathname:"/article/laborunion-welfare/list"})}>返回</button>
                                    <button type="button" onClick={this.save.bind(this)} className="btn btn-primary" style={{marginLeft:"20px"}}>保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
LaborUnionWelfareEdit.contextTypes= { router: React.PropTypes.object.isRequired};
