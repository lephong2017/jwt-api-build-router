import * as Types from '../constants/ActionType';
var userData = [];
const itemEditingService = (state = userData, action) => {
    switch (action.type) {
        case Types.ITEM_EDITING_SERVICE:
            return action.ItemEditService;
        default: return [...state];
        }
    };
export default itemEditingService;



