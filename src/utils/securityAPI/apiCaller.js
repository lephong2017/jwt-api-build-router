import axios from 'axios';
import  'babel-polyfill';
import  Oidc from 'oidc-client';
import * as Config from 'redux/categoryManagement/constants/Config';
import {config} from 'settings/configJWT';

const mgr = new Oidc.UserManager(config);
export const login=()=> {
    mgr.signinRedirect();
}
export const callApis= (endpoint,method='GET',body)=> {
   return mgr.getUser().then((user) =>{
         return  axios({
            url: `${Config.API_URL}/${endpoint}`,
            method,
            headers:{
                'access-control-request-origin':'*',
                'content-type' : 'application/json',
                'Authorization': 'Bearer ' + user.access_token,
            },
            data: body
        }).then(a =>{
            return a;
        }).catch(err => {
        });
    });
}
export const logout=()=> {
    mgr.signoutRedirect();
}

