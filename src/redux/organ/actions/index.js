import * as Types from './../constants/ActionType';
// import {callApis} from 'utils/securityAPI/apiCaller';
import callApis from 'utils/CallAPI/apiCallerS';
export const actAddOrganRequest = (Organ) => {
    console.log("da goi api organ");
    sessionStorage.setItem('organ',Organ);
    return (dispatch) => {
        dispatch(actAddOrgan(Organ));
        return callApis('Organ/createOrgan', 'POST', Organ).then(res => {
            sessionStorage.setItem('organ',Organ);
            console.log(res.data);
            if(res.data===true){
                dispatch(actAddOrgan(Organ));
            }
        }).catch(error => console.log("Fetch Error "+ error));
    }
}

export const actAddOrgan = (organ) => {
    return {
        type: Types.ADD_ORGAN,
        organ
    }
}
export const actFetchingAllOrgan = () => {
    return (dispatch) => {
        dispatch(fetchingOrgan());
    }
}

export const fetchingOrgan = () => {
    return {
        type: Types.FETCHING_ORGAN,
    }
}