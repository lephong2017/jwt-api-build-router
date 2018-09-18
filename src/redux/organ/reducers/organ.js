import * as Types from 'redux/organ/constants/ActionType';

var organData =[
    {
        name:'Proptech Plus',
        describe:'Công ty cổ phần công nghệ bất động sản',
        address:'628 xa lộ Hà Nội, Oxygen lầu 2 phòng A01-A02',
        phoneNumber:'01643081355'
    }
];
    
const organ = (state = organData, action) => {
    var { organ } = action;
    switch (action.type) {
        case Types.ADD_ORGAN:
            // state.push(organ);
            return [...state];
        default: return [...state];
        }
    };

export default organ;



