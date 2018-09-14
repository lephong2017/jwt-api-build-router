import ReactTable from "react-table";
import "react-table/react-table.css";
import 'antd/dist/antd.css';
import { Table } from 'antd';
import React, { Component } from 'react';

import {updateIndex} from 'settings/settings_key_antd';
export default class extends Component{
    static  TableAntd =(dataSource,columns,obj) =>{
        var currentPage=1;
       return ( <div key={`table_antd${updateIndex()}`}>
        <Table 
            pagination={
                { 
                    pageSizeOptions: ['10', '20', '30', '40'] ,
                    pageSize:5,
                    onChange:( pIndex)=>{
                        obj.onPageChange( pIndex);
                        currentPage=pIndex-1;
                        return pIndex;
                    },
                    current:currentPage
                }
            }
            dataSource={dataSource} 
            columns={columns}
            loading={obj.loadding['isFetchingCategory']}
            rowKey={`table_antd${updateIndex()}`}
            size="small"
        />
        </div>);
    }
    static TableReact =(data,col,obj) =>{
        return(<div key={data}>
            <ReactTable
              data={data}
              columns={col} 
              loading={obj.loadding['isFetching']}
              defaultPageSize={5}
              defaultFilterMethod={(filter, row)=>{obj.defaultFilterMethod(filter,row)}}
              onPageChange={( pIndex)=>{obj.onPageChange( pIndex);return pIndex}}
              onPageSizeChange={(pSize, pIndex)=>{obj.onPageSizeChange(pSize,pIndex)}}
              className="-striped -highlight"
              page={obj.page-1}
              pageSize={obj.pageSize}
            />
        </div>);
    }

}