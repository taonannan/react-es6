import web from './index.web';
import {is_api,is_h5,mode} from '../config';

export default function use_router(app){
	if(is_h5()){
		app.use(mobile.routes()).use(mobile.allowedMethods());
	}else{
		app.use(web.routes()).use(web.allowedMethods());
	}
    
}

