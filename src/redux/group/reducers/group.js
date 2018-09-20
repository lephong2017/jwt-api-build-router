import * as Types from 'redux/group/constants/ActionType';
import {service} from 'example-data/group';
var userData = [];
var arr =[]
const users = (state = userData, action) => {
    var { users ,organ} = action;
    var index = -1;
    var arrTemp=[];
    switch (action.type) {
        case Types.ADD_GROUP:
            userData=[];
            state.push(users);
            return [...state];
        case Types.FILTER_GROUP_ORGAN:
            let arrTmp=service.filter(group=>{
               return group.organID===(organ.id+'')
            });
            return [...arrTmp];
        case Types.FETCH_GROUP:
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
        case Types.FETCH_GROUP_FILTER:
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
        case Types.UPDATE_GROUP:
            arr=[];
            userData=[];
            index = findIndex(state, users.productId);
            state[index] = users;
            return [...state];
        case Types.DELETE_GROUP:
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



