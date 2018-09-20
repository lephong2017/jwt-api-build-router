import * as Types from './../constants/ActionType';
// import {callApis} from 'utils/securityAPI/apiCaller';
import callApis from 'utils/CallAPI/apiCallerS';

export const actFilterUserWithOrgan = (organ) => {
    console.log("da goi api");
    return (dispatch) => {
        dispatch(filterUser(organ));
        return callApis('Users/createUsers', 'POST', organ).then(res => {

            console.log(res.data);
            if(res.data===true){
                dispatch(filterUser(organ));
            }
        }).catch(error => console.log("Fetch Error "+ error));
    }
}
export const filterUser = (organ) => {
    return {
        type: Types.FILTER_USER_ORGAN,
        organ
    }
}
export const actAddUsersRequest = (Users) => {
    console.log("da goi api");
    return (dispatch) => {
        return callApis('Users/createUsers', 'POST', Users).then(res => {

            console.log(res.data);
            if(res.data===true){
                dispatch(actAddUsers(Users));
            }
        }).catch(error => console.log("Fetch Error "+ error));
    }
}

export const actAddUsers = (Users) => {
    return {
        type: Types.ADD_USER,
        Users
    }
}

export const   actFetchUserRequest = (pageSize,pageIndex,StringFilter) => {
    var total =0;
    callApis(`/RefUser/CountUserFilter/${StringFilter}/false`, 'GET', null).then(res => {
        total = res.data;
    });
    return (dispatch) => {
        dispatch(actFetching(true));
         return callApis(`RefUser/FilterUser/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then((a)=>{
            dispatch(actFetchUser(a.data,pageIndex,pageSize,total));
            dispatch(actFetching(false));
        });
    };
};

export const actFetchUser = (User,pageIndex,pageSize,totalData) => {
    return {
        type: Types.FETCH_USER,
        User,
        pageIndex,
        pageSize,
        totalData
    }
};
export const actFetchUserFilter = (User,pageSize,pageIndex,totalData) => {
    return {
        type: Types.FETCH_USER_FILTER,
        User,
        pageSize,
        pageIndex,
        totalData
    }
};
export const actFetching = (isFetching) => {
    return {
        type: Types.IS_FETCHING_USER,
       isFetching
    }
};


export const searchUserRequest = (pageSize,pageNow,keywork) => {
    console.log(keywork+" is search with word ");
    var total =0;
    callApis(`/RefUser/CountUserFilter/${keywork}/true`, 'GET', null).then(res => {
        total = res.data;
    });
    return (dispatch) => {
        dispatch(actFetching(true));
        return callApis(`/RefUser/FilterUser/${pageSize}/${pageNow}/${keywork}`, 'GET', null).then(res => {
            dispatch(actFetchUserFilter(res.data,pageSize,pageNow,total));
            dispatch(actFetching(false));
        });
    }
};

export const actUpdateUserRequest = (User,pageIndex,pageSize,StringFilter) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApis(`RefUser/editRefUser/id?id=${User.cateId}`, 'PUT', User).then(res => {
            var total =0;
            callApis(`/RefUser/CountUserFilter/${StringFilter}/${condition}`, 'GET', null).then(res => {
                total = res.data;
            });
            return callApis(`RefUser/FilterUser/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
                if(StringFilter===''||StringFilter==="ALL"||StringFilter===0){
                    dispatch(actFetchUser(res.data,pageIndex,pageSize,total));
                }else{
                    dispatch(actFetchUserFilter(res.data,pageSize,pageIndex,total));
                }
            });
        });
    }
}

export const actUpdateUser = (User) => {
    return {
        type: Types.UPDATE_USER,
        User
    }
}

export const actDeleteUserRequest = (id,pageSize,pageIndex,StringFilter) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApis(`RefUser/deleteRefUser?id=${id}`, 'DELETE', null).then(res => {
            var total =0;
            callApis(`/RefUser/CountUserFilter/${StringFilter}/${condition}`, 'GET', null).then(res => {
                total = res.data;
            });
            return callApis(`RefUser/FilterUser/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
                if(StringFilter===''||StringFilter===0||StringFilter==="ALL"){
                    dispatch(actFetchUser(res.data,pageIndex,pageSize,total));
                }else{
                    dispatch(actFetchUserFilter(res.data,pageSize,pageIndex,total));
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
};

export const actDeleteUser = (id) => {
    return {
        type: Types.DELETE_USER,
        id
    }
}

export const actGetUserRequest = (id) => {
    return dispatch => {
        return callApis(`RefUser/getFindIDRefUser/id?id=${id}`, 'GET', null).then(res => {
            console.log(res.data);
            dispatch(actGetUser(res.data));
        });
    }
}

export const actGetUser = (User) => {
    return {
        type : Types.EDIT_USER,
        User
    }
}


