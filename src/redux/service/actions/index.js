import * as Types from './../constants/ActionType';
import callApis from 'utils/CallAPI/apiCaller';

export const actGetAllServiceByOrganId = (organID,pageSize,pageIndex,accesstoken) => {
    console.log(organID,pageSize,pageIndex,accesstoken);
    var total =0;
    callApis(`Service/CountServices/${organID}/true`, 'GET', null,accesstoken).then(res => {
        total = res.data;
    });
    return (dispatch) => {
        dispatch(actFetching(true));
         return callApis(`Service/GetAllServiceByOrganId/${organID}/${pageSize}/${pageIndex}`, 'GET', null,accesstoken).then((a)=>{
            console.log(a.data);
            dispatch(fetchingService(a.data,pageIndex,pageSize,total));
            dispatch(actFetching(false));
        });
    };
}
export const actGetAllService = (pageSize,pageIndex,StringFilter,accesstoken) => {
    var total =0;
    callApis(`Service/CountServices/${StringFilter}/false`, 'GET', null,accesstoken).then(res => {
        total = res.data;
    });
    return (dispatch) => {
        dispatch(actFetching(true));
         return callApis(`Service/FilterServices/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null,accesstoken).then((a)=>{
            dispatch(fetchingService(a.data,pageIndex,pageSize,total));
            dispatch(actFetching(false));
        });
    };
};

export const fetchingService = (service,pageIndex,pageSize,totalData) => {
    return {
        type: Types.FETCHING_SERVICE,
        service,
        pageIndex,
        pageSize,
        totalData
    }
}

export const actFetching = (isFetchingService) => {
    return {
        type: Types.IS_FETCHING_SERVICE,
        isFetchingService
    }
};
export const searchServiceRequest = (pageSize,pageIndex,StringFilter,accesstoken) => {
    var total =0;
    callApis(`Service/CountServices/${StringFilter}/true`, 'GET', null,accesstoken).then(res => {
        total = res.data;
    });
    return (dispatch) => {
        dispatch(actFetching(true));
         return callApis(`Service/FilterServices/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null,accesstoken).then((a)=>{
            dispatch(fetchingService(a.data,pageIndex,pageSize,total));
            dispatch(actFetching(false));
        });
    };
}
export const actUpdateServiceRequest = (IDService,service,pageIndex,pageSize,StringFilter,accesstoken) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        dispatch(actFetching(true));
        return callApis(`Service/EditServices/id?id=${IDService}`, 'PUT', service,accesstoken).then(() => {
            var total =0;
            callApis(`Service/CountServices/${StringFilter}/${condition}`, 'GET', null,accesstoken).then(res => {
                total = res.data;
            });
            return callApis(`Service/FilterServices/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null,accesstoken).then(res => {
                    dispatch(fetchingService(res.data,pageIndex,pageSize,total));
                    dispatch(actFetching(false));
            });
        });
    }
}

export const actAddServiceRequest = (service,pageIndex,pageSize,StringFilter,accesstoken) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        dispatch(actFetching(true));
        return callApis('Service/CreateServices', 'POST', service,accesstoken).then(res => {
            var total =0;
            callApis(`Service/CountServices/${StringFilter}/${condition}`, 'GET', null,accesstoken).then(res => {
                total = res.data;
            });
            return callApis(`Service/FilterServices/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null,accesstoken).then(res => {
                    dispatch(fetchingService(res.data,pageIndex,pageSize,total));
                    dispatch(actFetching(false));
            });
        }).catch(error => console.log("Fetch Error "+ error));
    }
}
export const actDeleteServiceRequest = (id,pageSize,pageIndex,StringFilter,accesstoken) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApis(`Service/deleteServices?id=${id}`, 'DELETE', null,accesstoken).then(() => {
            var total =0;
            callApis(`Service/CountServices/${StringFilter}/${condition}`, 'GET', null,accesstoken).then(res => {
                total = res.data;
            });
            return callApis(`Service/FilterServices/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null,accesstoken).then(res => {
                    dispatch(fetchingService(res.data,pageIndex,pageSize,total));
            });
        }).catch(err => {
            console.log(err);
        });
    }
};
export const actDeleteServiceByOrganIDRequest = (id,organID,pageSize,pageIndex,StringFilter,accesstoken) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApis(`Service/deleteServices?id=${id}/organID=${organID}`, 'DELETE', null,accesstoken).then(() => {
            var total =0;
            callApis(`Service/CountServices/${StringFilter}/${condition}`, 'GET', null,accesstoken).then(res => {
                total = res.data;
            });
            return callApis(`Service/FilterServices/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null,accesstoken).then(res => {
                    dispatch(fetchingService(res.data,pageIndex,pageSize,total));
            });
        }).catch(err => {
            console.log(err);
        });
    }
};

export const actFindService=  (serviceID , accesstoken)=>{
    return (dispatch) => {
        return callApis(`Service/FindServices/id?id=${serviceID}`, 'GET', null,accesstoken).then((res) => {
            console.log(res.data)
            dispatch(editService(res.data));
        }).catch(err => {
            console.log(err);
        });
    }
}
export const editService = (ItemEditService)=>{
   return{
       type:Types.ITEM_EDITING_SERVICE,
       ItemEditService
   } 

}