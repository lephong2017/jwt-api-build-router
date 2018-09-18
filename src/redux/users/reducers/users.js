import * as Types from 'redux/users/constants/ActionType';

var userData = [];
const users = (state = userData, action) => {
    var { users } = action;
    switch (action.type) {
        case Types.ADD_USER:
            userData=[];
            state.push(users);
            return [...state];
        
        default: return [...state];
        }
    };

export default users;



