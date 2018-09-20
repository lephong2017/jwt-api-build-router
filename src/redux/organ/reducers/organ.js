import * as Types from 'redux/organ/constants/ActionType';
import {organ} from 'example-data/organ';
var organData =[
    {
        name:'Proptech Plus',
        describe:'Công ty cổ phần công nghệ bất động sản',
        address:'628 xa lộ Hà Nội, Oxygen lầu 2 phòng A01-A02',
        phoneNumber:'01643081355'
    }
];
   

const organzation = (state = organData, action) => {
    // var { organ } = action;
    switch (action.type) {
        case Types.ADD_ORGAN:
            return [...organData];
        case Types.FETCHING_ORGAN:
            console.log(organ);
            return [...organ];
        default: return [...state];
        }
    };

export default organzation;



