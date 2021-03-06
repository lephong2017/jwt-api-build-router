import { combineReducers } from 'redux';

import categorys_index from './categoryManagement/reducers/cate_index';
import isFetchingCategory from './categoryManagement/reducers/isFetching';
import itemCateEditing from './categoryManagement/reducers/itemCateEditing';
import scopeOfUser from './categoryManagement/reducers/scopeOfUser';

import products from './productManagement/reducers/products';
import itemEditing from './productManagement/reducers/itemEditing';
import categorys from './productManagement/reducers/cates';
import saveCateCode from './productManagement/reducers/saveCateCode';
import totalData from './productManagement/reducers/TotalData';
import isFetching from './productManagement/reducers/isFetching';

import users from './users/reducers/users';
import account from './users/reducers/account';
import accesstoken from './users/reducers/accesstoken';

import organs from './organ/reducers/organ';
 
import group from './group/reducers/group';

import service from './service/reducers/service';
import itemEditingService from './service/reducers/itemEditingService';

const appReducers = combineReducers({
    categorys_index,isFetchingCategory,itemCateEditing,scopeOfUser,
    products,itemEditing,categorys,saveCateCode,totalData,isFetching,
    users,account,accesstoken,
    organs,
    group,
    service,itemEditingService

});

export default appReducers;