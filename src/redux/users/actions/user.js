import * as Types from './../constants/ActionType';
import callApis from 'utils/CallAPI/apiCallerS';
import {ACCESS_TOKEN,USERS} from 'settings/sessionStorage';
export const handleLogin = (user) => {
    return (dispatch) => {
        return callApis('User/Login', 'POST', user).then(res => {
            console.log(res.data);
            sessionStorage.setItem(ACCESS_TOKEN,res.data);
            sessionStorage.setItem(USERS,user.email);
            dispatch(saveAccountUser(user));
            dispatch(saveAccessToken(res.data));
        }).catch(error => console.log("Fetch Error "+ error));
    }
}
export const saveAccessToken = (AccessToken) => {
    return {
        type: Types.SAVE_TOKEN,
        AccessToken
    }
}
export const saveAccountUser = (users) => {
    return {
        type: Types.LOGIN,
        users
    }
}
export const handleLogout = (Users) => {
    if(Users===undefined) return;
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(USERS);
    return (dispatch) => {
        return callApis(`User/Logout/usename?userName=${Users}`, 'GET', Users).then(res => {
            sessionStorage.removeItem(ACCESS_TOKEN);
            sessionStorage.removeItem(USERS);
            dispatch(saveAccessToken(null));
            dispatch(actLogout(res.data));
        }).catch(error => console.log("Fetch Error "+ error));
    }
}
export const actLogout = (status) => {
    return {
        type:Types.LOG_OUT,
        status
    }
}

export const handleRegister = (Users) => {
    return (dispatch) => {
        return callApis('User/register', 'POST', Users).then(res => {
            console.log(res.data);
            console.log(Users);
            if(res.data===true){
                dispatch(acthandleRegister(Users));
            }
        }).catch(error => console.log("Fetch Error "+ error));
    }
}
export const acthandleRegister = (account) => {
    return {
        type: Types.REGISTER_ACCOUNT,
        account
    }
}

