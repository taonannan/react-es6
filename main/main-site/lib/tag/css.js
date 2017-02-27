'use strict';

import Tag from './tag';
import {dev,mode,is_h5,is_api} from '../config';
/**
 * author by wangshaojun
 * @example
 * css控件
 */
class CssTag extends Tag {
   constructor() {
     super('css');
     this.end = false;
   }

   render(context, attrs) {
       let url = attrs[attrs.length - 1];

       let path = (is_h5()||is_api()) ? 'mobile_site' : 'pc_site';
       let html = '<link rel="stylesheet" href="/static/'+ path +'/style/'+ url +'.css">';

     return html;
   }
}

module.exports = CssTag;
