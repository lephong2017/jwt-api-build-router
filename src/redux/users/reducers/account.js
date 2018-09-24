import * as Types from '../constants/ActionType';
const init=[];
const account = (state = init, action) => {
    const {account,users} = action;
    switch (action.type) {
        case Types.REGISTER_ACCOUNT:
            return account;
        case Types.LOGIN:
            return users;
        case Types.LOG_OUT:
            return null;
        default: return state;
    }
};

export default account;