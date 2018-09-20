import * as Types from './../constants/ActionType';
import callApis from 'utils/CallAPI/apiCallerS';

export const actFilterGroupWithOrgan = (organ) => {
    console.log("da goi api");
    return (dispatch) => {
        dispatch(filterGroup(organ));   
        return callApis('Users/createUsers', 'POST', organ).then(res => {
            console.log(res.data);
            if(res.data===true){
                dispatch(filterGroup(organ));
            }
        }).catch(error => console.log("Fetch Error "+ error));
    }
}
export const filterGroup = (organ) => {
    return {
        type: Types.FILTER_GROUP_ORGAN,
        organ
    }
}