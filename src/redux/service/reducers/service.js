import * as Types from '../constants/ActionType';
var userData = [];
var arr =[]
const service = (state = userData, action) => {
    var arrTemp=[];
    switch (action.type) {
        case Types.FETCHING_SERVICE:
            var sumTotal = action.totalData;
             arrTemp = new Array(sumTotal);
            arrTemp.fill(0);
            var pageId=action.pageIndex;
            if(pageId===1){
                for (let i = 0; i < action.service.length; i++) {
                    arrTemp[i]=action.service[i];
                } 
                arr=arrTemp; 
                return arrTemp;
            }
            var pageSize = action.pageSize;
            for (var i = 0; i < action.service.length; i++) {
               arr[(pageId-1)*pageSize+i]=action.service[i];
            }
            return arr;
        default: return [...state];
        }
    };
export default service;



