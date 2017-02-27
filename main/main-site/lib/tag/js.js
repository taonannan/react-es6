'use strict';

import Tag from './tag';
import {dev,mode,is_h5,is_api} from '../config';
/**
 * author by wangshaojun
 * @example
 * css控件
 */
class JsTag extends Tag {
   constructor() {
     super('js');
     this.end = false;
   }

   render(context, attrs) {

       let url = attrs[attrs.length - 1];

       let path = (is_h5() || is_api()) ? 'mobile_site' : 'pc_site';
       let html = `<script type="text/javascript" src="/static/${path}/script/${url}.js"></script>`;

     return html;
   }
}

module.exports = JsTag;
