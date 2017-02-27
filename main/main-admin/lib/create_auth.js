import config from './config';

import {create_login, auth_map} from '../auth/index';

export {auth_map};
export default create_login(config('session'));