import config from './config';

import {auth_filter} from '../auth/index';
var auth =  auth_filter(config('session'));
export default auth

