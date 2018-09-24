import axios from 'axios';
import * as Config from 'settings/ConfigAPI.js';

export default function callApi(endpoint, method = 'GET', body,accesstoken) {
    return axios({ 
        url: `${Config.API_URL_S}/${endpoint}`,
        method,
        headers:{
            'access-control-request-origin':'*',
            'content-type' : 'application/json',
            'Authorization': 'Bearer ' + accesstoken,
        },
        data: body
    }).catch(err => {
        console.log(err);
    });
};
