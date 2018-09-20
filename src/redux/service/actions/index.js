import * as Types from './../constants/ActionType';
import callApis from 'utils/CallAPI/apiCallerS';

export const actFilterServiceWithOrgan = (organ) => {
    console.log("da goi api");
    return (dispatch) => {
        dispatch(filterService(organ));   
        return callApis('Users/createUsers', 'POST', organ).then(res => {
            console.log(res.data);
            if(res.data===true){
                dispatch(filterService(organ));
            }
        }).catch(error => console.log("Fetch Error "+ error));
    }
}
export const filterService = (organ) => {
    return {
        type: Types.FILTER_SERVICE_ORGAN,
        organ
    }
}