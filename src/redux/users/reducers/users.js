import * as Types from 'redux/users/constants/ActionType';
import {user} from 'example-data/user';
var userData = [];
var arr =[]
const users = (state = userData, action) => {
    var { users ,organ} = action;
    var index = -1;
    var arrTemp=[];
    switch (action.type) {
        case Types.ADD_USER:
            userData=[];
            state.push(users);
            return [...state];
        case Types.FILTER_USER_ORGAN:
            let arrTmp=user.filter(user=>{
               return user.organID===(organ.id+'')
            });
            return [...arrTmp];
        case Types.FETCH_USER:
            var sumTotal = action.totalData;
             arrTemp = new Array(sumTotal);
            arrTemp.fill(0);
            var pageId=action.pageIndex;
            if(pageId===1){
                for (let i = 0; i < action.User.length; i++) {
                    arrTemp[i]=action.User[i];
                } 
                arr=arrTemp; 
                return arrTemp;
            }
            var pageSize = action.pageSize;
            for (var i = 0; i < action.User.length; i++) {
               arr[(pageId-1)*pageSize+i]=action.User[i];
            }
            return arr;
        case Types.FETCH_USER_FILTER:
            var sumData = action.totalData;
            // console.log(sumData+" is total data filter");
             arrTemp = new Array(sumData);
            arrTemp.fill(0);
            if(action.pageIndex===1){
                for (let i = 0; i < action.User.length; i++) {
                    arrTemp[i]=action.User[i];
                }
                userData=arrTemp;
                return userData;
            } 
            for (let i = 0; i < action.User.length; i++) {
                userData[(action.pageIndex-1)*action.pageSize+i]=action.User[i];
                
            }
            //copy productData vao arrTemp sau do gan lai cho productData
            return userData;
        case Types.UPDATE_USER:
            arr=[];
            userData=[];
            index = findIndex(state, users.productId);
            state[index] = users;
            return [...state];
        case Types.DELETE_USER:
            return [...arr];
        default: return [...state];
        }
    };
    var findIndex = (products, id) => {
        var result = -1;
        products.forEach((product, index) => {
            if (product.productId === id) {
                result = index;
            }
        });
        return result;
    }
export default users;



