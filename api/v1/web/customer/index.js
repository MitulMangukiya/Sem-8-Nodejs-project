/*
 * @file: index.js
 * @description: It's combine all customer routers.
 */

import saveCustomer from './save';
import login from './login';
import list from './list';
import deleteOne from './delete';
import userprofile from './addprofileimg';

export default [saveCustomer,login,list,deleteOne,userprofile]
