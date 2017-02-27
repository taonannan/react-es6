import React from 'react';
import ReactDOM from 'react-dom';

export default function Paginate({data, onPageTo}){
    var {total, page, pagesize} =data;
    page=parseInt(page||1);
    total=parseInt(total||0);
    pagesize=pagesize||10;
    if(pagesize<3){
        pagesize=3;
    }
    var max=(total%pagesize == 0? total/pagesize : parseInt(total/pagesize)+1);
    if(max<1){
        max=1;
    }
    var begin=1,end=max;
    var middle=Math.floor(pagesize/2);
    middle=middle>2? middle:2;
    var begin=page-middle+1;
    var end=page+pagesize-middle;

    if(end < pagesize){
        end=pagesize;
    }

    if(end > max){
        end=max;
        begin=end-pagesize+1;
    }

    if(begin < 1){
        begin=1;
    }
    var lis=[];
    lis.push(<li key={'<'} ><a onClick={onPageTo.bind(null,page-1)}   disabled={begin==page} >«</a></li>);
    for(var i=begin; i<=end; i++){
        lis.push(<li key={i} ><a onClick={onPageTo.bind(null,i)} disabled={i===page}  >{i}</a></li>);
    }
    lis.push(<li key={'>'} ><a onClick={onPageTo.bind(null,page+1)} disabled={end==page} >»</a></li>);
    return (
        <div className="row">
            <div className="col-sm-5">
                {/*<div className="dataTables_info" >第1页 (共2页)</div>*/}
            </div>
            <div className="col-sm-7">
                <div className="dataTables_paginate paging_simple_numbers" >
                    <ul className="pagination pagination-sm no-margin ">
                        {lis}
                    </ul>
                </div>
            </div>
        </div>
    );
}
