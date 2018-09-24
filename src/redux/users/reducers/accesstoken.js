import * as Types from '../constants/ActionType';
const init=null;
const accesstoken = (state = init, action) => {
    const {AccessToken} = action;
    switch (action.type) {
        case Types.SAVE_TOKEN:
            return AccessToken;
        default: return state;
    }
};

export default accesstoken;