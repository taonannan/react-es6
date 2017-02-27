import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Router, Link,browserHistory } from 'react-router';




export default class Navigation extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {};
    }
    componentWillMount() {
      
      
    }
   
    componentWillReceiveProps(nextProps){
       
    }

    navSelect(e){
        e.preventDefault();
        var target = e.target;
        if(target.tagName.toLowerCase()=="a"&&target.getAttribute("href").indexOf("/")!=-1){
            $(".sidebar-menu li").removeClass("active");
            $(target).parents("li").addClass("active");
            browserHistory.push({pathname:target.getAttribute("href")});
        }
    }
    

    render(){
      return (
        <div >
            <header className="main-header">
                <a href="index2.html" className="logo">
                  <span className="logo-mini"><b>VOSMS</b></span>
                  <span className="logo-lg">VOSMS管理系统</span>
                </a>
                <nav className="navbar navbar-static-top">
                  <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span className="sr-only">Toggle navigation</span>
                  </a>

                  <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                      <li className="dropdown messages-menu">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                          <i className="fa fa-envelope-o"></i>
                          <span className="label label-success">4</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li className="header">你有 4 条消息</li>
                          <li>
                            <ul className="menu">
                              <li>
                                <a href="#">
                                  <div className="pull-left">
                                    <img src="/static/main/resource/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                                  </div>
                                  <h4>
                                    技术支持团队
                                    <small><i className="fa fa-clock-o"></i> 5 分钟</small>
                                  </h4>
                                  <p>我们永远是你们的技术后盾</p>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <div className="pull-left">
                                    <img src="/static/main/resource/img/user3-128x128.jpg" className="img-circle" alt="User Image" />
                                  </div>
                                  <h4>
                                    张哲
                                    <small><i className="fa fa-clock-o"></i> 2 小时</small>
                                  </h4>
                                  <p>我很傻</p>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <div className="pull-left">
                                    <img src="/static/main/resource/img/user4-128x128.jpg" className="img-circle" alt="User Image" />
                                  </div>
                                  <h4>
                                    杜慧杰
                                    <small><i className="fa fa-clock-o"></i> 今天</small>
                                  </h4>
                                  <p>帅</p>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <div className="pull-left">
                                    <img src="/static/main/resource/img/user3-128x128.jpg" className="img-circle" alt="User Image" />
                                  </div>
                                  <h4>
                                    这是？
                                    <small><i className="fa fa-clock-o"></i> 昨天</small>
                                  </h4>
                                  <p>无语。。。。</p>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <div className="pull-left">
                                    <img src="/static/main/resource/img/user4-128x128.jpg" className="img-circle" alt="User Image" />
                                  </div>
                                  <h4>
                                    哈哈
                                    <small><i className="fa fa-clock-o"></i> 2 天</small>
                                  </h4>
                                  <p>主题?</p>
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="footer"><a href="#">查看所有消息</a></li>
                        </ul>
                      </li>
                      <li className="dropdown notifications-menu">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                          <i className="fa fa-bell-o"></i>
                          <span className="label label-warning">10</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li className="header">You have 10 notifications</li>
                          <li>
                            <ul className="menu">
                              <li>
                                <a href="#">
                                  <i className="fa fa-users text-aqua"></i> 5 new members joined today
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fa fa-warning text-yellow"></i> Very long description here that may not fit into the
                                  page and may cause design problems
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fa fa-users text-red"></i> 5 new members joined
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fa fa-shopping-cart text-green"></i> 25 sales made
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fa fa-user text-red"></i> You changed your username
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="footer"><a href="#">View all</a></li>
                        </ul>
                      </li>
                      
                      <li className="dropdown user user-menu">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                          <img src="/static/main/resource/img/user2-160x160.jpg" className="user-image" alt="User Image" />
                          <span className="hidden-xs">杜慧杰</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li className="user-header">
                            <img src="/static/main/resource/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                            <p>
                              云简(北京)网络科技有限公司
                              <small>技术部</small>
                            </p>
                          </li>
                          <li className="user-body">
                            <div className="row">
                              <div className="text-center">
                               写一段座右铭吧
                              </div>
                            </div>
                          </li>
                          <li className="user-footer">
                            <div className="pull-left">
                              <a href="#" className="btn btn-default btn-flat">个人资料</a>
                            </div>
                            <div className="pull-right">
                              <a href="#" className="btn btn-default btn-flat">退出</a>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </nav>
              </header>
            
            <aside className="main-sidebar">
                <section className="sidebar">
                  <div className="user-panel">
                    <div className="pull-left image">
                      <img src="/static/main/resource/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                    </div>
                    <div className="pull-left info">
                      <p>杜慧杰</p>
                      <a href="#"><i className="fa fa-circle text-success"></i> 在线</a>
                    </div>
                  </div>
                 
                  <ul className="sidebar-menu" onClick={this.navSelect.bind(this)}>
                    <li className="header">导航</li>
                    <li className="active treeview">
                      <a href="#">
                        <i className="fa fa-book"></i> <span>文章</span>
                        <span className="pull-right-container">
                          <i className="fa fa-angle-left pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li className="active"><a href="/home"><i className="fa fa-circle-o"></i> 工会风采</a></li>
                        <li><a href="/article/laborunion-welfare/list"><i className="fa fa-circle-o"></i> 工会福利</a></li>
                        <li><a href="javascript:void 0;"><i className="fa fa-circle-o"></i> 文体活动</a></li>
                        <li><a href="javascript:void 0;"><i className="fa fa-circle-o"></i> 通知公告</a></li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="#">
                        <i className="fa fa-envelope"></i> <span>消息</span>
                        <span className="pull-right-container">
                          <i className="fa fa-angle-left pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li ><a href="/home"><i className="fa fa-circle-o"></i> 物业消息</a></li>
                        <li><a href="/test"><i className="fa fa-circle-o"></i> 集团消息</a></li>
                      </ul>
                    </li>
                  </ul>
                </section>
            </aside>
             <div className="content-wrapper">
             {this.props.children}
            </div>
            <footer className="main-footer">
                <div className="pull-right hidden-xs">
                  <b>版本</b> 2.3.11
                </div>
                <strong>Copyright &copy; 2017-2020 <a href="http://almsaeedstudio.com">云简(北京)网络科技有限公司</a>.</strong> All rights
                reserved.
            </footer>
        </div>
      )


    }
}
