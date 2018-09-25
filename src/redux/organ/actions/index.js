import * as Types from './../constants/ActionType';
import callApis from 'utils/CallAPI/apiCaller';
export const actAddOrganRequest = (Organ,pageIndex,pageSize,StringFilter,accesstoken) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        dispatch(actFetching(true));
        return callApis('Organ/CreateOrgan', 'POST', Organ,accesstoken).then(res => {
            var total =0;
            callApis(`Organ/CountOrgan/${StringFilter}/${condition}`, 'GET', null,accesstoken).then(res => {
                total = res.data;
            });
            return callApis(`Organ/FilterOrgan/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null,accesstoken).then(res => {
                    dispatch(fetchingOrgan(res.data,pageIndex,pageSize,total));
                    dispatch(actFetching(false));
            });
        }).catch(error => console.log("Fetch Error "+ error));
    }
}

export const actAddOrgan = (organ) => {
    return {
        type: Types.ADD_ORGAN,
        organ
    }
}
export const actFetchOrganRequest = (pageSize,pageIndex,StringFilter,accesstoken) => {
    var total =0;
    callApis(`Organ/CountOrgan/${StringFilter}/false`, 'GET', null,accesstoken).then(res => {
        total = res.data;
    });
    return (dispatch) => {
        dispatch(actFetching(true));
         return callApis(`Organ/FilterOrgan/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null,accesstoken).then((a)=>{
            dispatch(fetchingOrgan(a.data,pageIndex,pageSize,total));
            dispatch(actFetching(false));
        });
    };
};

export const fetchingOrgan = (organ,pageIndex,pageSize,totalData) => {
    return {
        type: Types.FETCHING_ORGAN,
        organ,
        pageIndex,
        pageSize,
        totalData
    }
}

export const actUpdateOrganRequest = (idOrganzination,Organ,pageIndex,pageSize,StringFilter,accesstoken) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        dispatch(actFetching(true));
        return callApis(`Organ/EditOrgan/id?id=${idOrganzination}`, 'PUT', Organ,accesstoken).then(() => {
            var total =0;
            callApis(`Organ/CountOrgan/${StringFilter}/${condition}`, 'GET', null,accesstoken).then(res => {
                total = res.data;
            });
            return callApis(`Organ/FilterOrgan/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null,accesstoken).then(res => {
                    dispatch(fetchingOrgan(res.data,pageIndex,pageSize,total));
                    dispatch(actFetching(false));
            });
        });
    }
}


export const searchOrganRequest = (pageSize,pageNow,keywork,accesstoken) => {
    var total =0;
    callApis(`Organ/CountOrgan/${keywork}/true`, 'GET', null,accesstoken).then(res => {
        total = res.data;
    });
    return (dispatch) => {
        dispatch(actFetching(true));
        return callApis(`Organ/FilterOrgan/${pageSize}/${pageNow}/${keywork}`, 'GET', null,accesstoken).then(res => {
            dispatch(fetchingOrgan(res.data,pageNow,pageSize,total));
            dispatch(actFetching(false));
        });
    }
};
export const actFetchOrganFilter = (products,pageSize,pageIndex,totalData) => {
    return {
        type: Types.FETCH_ORGAN_FILTER,
        products,
        pageSize,
        pageIndex,
        totalData
    }
};

export const actFetching = (isFetchingOrgan) => {
    return {
        type: Types.IS_FETCHING_ORGAN,
        isFetchingOrgan
    }
};

export const actDeleteOrganRequest = (id,pageSize,pageIndex,StringFilter,accesstoken) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApis(`Organ/deleteOrganization?id=${id}`, 'DELETE', null,accesstoken).then(() => {
            var total =0;
            callApis(`Organ/CountOrgan/${StringFilter}/${condition}`, 'GET', null,accesstoken).then(res => {
                total = res.data;
            });
            return callApis(`Organ/FilterOrgan/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null,accesstoken).then(res => {
                    dispatch(fetchingOrgan(res.data,pageIndex,pageSize,total));
            });
        }).catch(err => {
            console.log(err);
        });
    }
};
