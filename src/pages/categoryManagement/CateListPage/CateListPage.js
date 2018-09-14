import React, { Component } from 'react';
import './CateListPage.css';
import { Link ,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import 'react-table/react-table.css';
import swal from 'sweetalert';
import MyButton from 'components/button/Button';
import {actFetchCategoryRequest, actDeleteCategoryRequest, searchCategoryRequest} from 'redux/categoryManagement/actions/index';
import {FormGroup,FormControl,Form,Button} from 'react-bootstrap';

import {login,logout} from 'utils/securityAPI/apiCaller';
import {ACCESS_TOKEN} from 'settings/sessionStorage';
import {setScopeAccess} from 'redux/categoryManagement/actions/cates';

import { createBrowserHistory } from "history";
import MyTable from '../../../components/table/MyTable';
// const history = createBrowserHistory();
import {updateIndex} from 'settings/settings_key_antd';
import ButtonAntd from '../../../components/button/ButtonAntd';

class CateListPage extends Component {  
    constructor(props){
        super(props);
        this.state={
            iSearch:"ALL",
            pageSize:5,
            pageIndex:1,
            listPageVisit:[1],
            listPageVisitFilter:[1],
            // scope:[],
        };
    }
    // componentDidMount(){
    //     // console.log("history cate");
    //     // console.log(history.location.pathname);
    //     // console.log("history cate");
    //     var ss =sessionStorage.getItem(ACCESS_TOKEN);
    //     var {pageSize,pageIndex,iSearch} = this.state;
    //     var obj = JSON.parse(ss);
    //     if(ss!==null){
    //         // console.log(obj.profile['name']);
    //         this.props.fetchAllCategory(pageSize,pageIndex,iSearch);
    //         this.props.setScopeOfUser(obj.profile['name']);
    //         // this.setState({scope:obj.profile['name']});
    //     }
    // }
    componentWillMount(){
        // Gọi trước khi component đc render lần đầu tiên 
        var {pageSize,pageIndex,iSearch} = this.state;
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var obj = JSON.parse(ss);
        if(ss!==null){
            this.props.fetchAllCategory(pageSize,pageIndex,iSearch);
            this.props.setScopeOfUser(obj.profile['name']);
            // this.setState({scope:obj.profile['name']});
        }
    }
    onChange=e =>{
        var val =e.target.value;
        if(val.trim()===''){
            this.setState({iSearch:"ALL"});
            this.props.fetchAllCategory(this.state.pageSize,this.state.pageIndex,"ALL");
        }else{
            this.setState({iSearch:e.target.value},function(){
             this.props.searchCategory(this.state.pageSize,this.state.pageIndex,this.state.iSearch);
            });
        }
        this.setState({
            listPageVisit:[],
            listPageVisitFilter:[],
        });
    }

    searchHandle=e=>{
        e.preventDefault();
        var word = this.state.iSearch;
        if(word!==''){
            if(word==='ALL'){
                this.props.fetchAllCategory(this.state.pageSize,this.state.pageIndex,"ALL");
            }else{
                console.log(word+" is word search, pageSize: "+this.state.pageSize+" pageInd: "+this.state.pageIndex);
                this.props.searchCategory(this.state.pageSize,this.state.pageIndex,word);
            }
        }else{
            console.log("Lỗi này hơi bị ghê!!!");
        }
        this.setState({
            listPageVisit:[],
            listPageVisitFilter:[],
        });
       
    }
    onDelete = (id) => { 
        // console.log(id);
        var {onDeleteCategory} = this.props;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                onDeleteCategory(id,this.state.pageSize,this.state.pageIndex,this.state.iSearch);
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    }
    onPageChange=(pageInd)=>{
        var { fetchAllCategory,searchCategory } = this.props;
        var stringFilter = this.state.iSearch;
        if(stringFilter===''||stringFilter==="ALL"){
            var pageVisit = this.state.listPageVisit;
            this.setState({
            pageIndex:pageInd,
            listPageVisitFilter:[],
        },
            function(){
                // console.log(this.state.listPageVisit);
                var isPageVisit= this.state.listPageVisit.includes(pageInd);
                if(isPageVisit===false){
                    pageVisit.push(pageInd);
                    this.setState({listPageVisit:pageVisit, });
                    fetchAllCategory(
                        this.state.pageSize,
                        this.state.pageIndex,
                        "ALL"
                    );
                    
                }
            });
        }else{
            this.setState({pageIndex:pageInd+1,listPageVisit:[]},
                function(){
                    var pageVisit = this.state.listPageVisitFilter;
                    var isPageVisit= this.state.listPageVisitFilter.includes(pageInd);
                    if(isPageVisit===false){
                        pageVisit.push(pageInd);
                        this.setState({listPageVisitFilter:pageVisit, });
                        searchCategory(
                            this.state.pageSize,
                            this.state.pageIndex,
                            stringFilter
                        );
                    }

                });
            }
        } 
    
    onPageSizeChange=(pSize, pIndex)=>{
        var { fetchAllCategory,searchCategory } = this.props;
        this.setState({
            pageIndex:pIndex+1,
            pageSize:pSize,
            listPageVisit:[],
            listPageVisitFilter:[],
        },
            function(){
                if(this.state.iSearch===0||
                    this.state.iSearch===''||
                    this.state.iSearch==="ALL"){
                        fetchAllCategory(
                            this.state.pageSize,
                            this.state.pageIndex,
                            "ALL"
                        );
                    }else{
                        searchCategory(
                            this.state.pageSize,
                            this.state.pageIndex,
                            this.state.iSearch
                        );
                    }
            });                                        
    }
    defaultFilterMethod=(filter, row)=>{
        String(row[filter.id]) === filter.value;
    }
    render() {
        var { isFetchingCategory,categorys,fetchAllCategory,searchCategory,scopeOfUser } = this.props;
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var isDisabled = (scopeOfUser.includes("CATE.WRITE"))?false:true;
        var objSetting={
            loadding:{isFetchingCategory},
            defaultFilterMethod:this.defaultFilterMethod,
            defaultPageSize:5,
            onPageChange:this.onPageChange,
            onPageSizeChange:this.onPageSizeChange,
            className: "-striped -highlight",
            page:this.state.pageIndex,
            pageSize:this.state.pageSize
        }
        var myCol=[
            {
                title: "ID",
                dataIndex: "productCategoryCode",
                key:`productCategoryCode${updateIndex()}`,
            },
            {
                title: "Description",
                dataIndex: "productCategoryDescription",
                key:`productCategoryDescription${updateIndex()}`,
            },
            
            {
                title: "Edit",
                key:`edit${updateIndex()}`,
                dataIndex:"productCategoryCode",
                render:(text, record, index)  => {
                    return (
                        <div className="button-table"> 
                            <ButtonAntd 
                                isDisabled={isDisabled} 
                                acttype='EDIT' 
                                ID={text}
                                obj="cate"
                                pagination={[
                                    this.state.pageIndex,
                                    this.state.pageSize,
                                    this.state.iSearch
                                ]}
                                type="primary" shape="circle" icon="edit" />
                        </div>
                        )
                }
            },
            {   
                title: "Delete",
                key:`delete${updateIndex()}`,
                dataIndex:"productCategoryCode",
                render: (text, record, index) => {
                    return (
                        <div  className="button-table"> 
                            <ButtonAntd 
                                isDisabled={isDisabled} 
                                size="small"  acttype='DELETE' 
                                onClickComponent={()=>{this.onDelete(text);}}
                                />
                        </div>
                        )
                } 
            }];
       return (ss===null) ?
            (<div>
               <h1 style={{color:'red'}}>Để xem chức năng này bạn cần phải đăng nhập trước!!!</h1>
                <Button bsStyle="success" onClick={login}>Đăng nhập</Button>
           </div>)
        :(!categorys.includes(undefined))?
         (<div className="container-content">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="container-table">
                            <div className="row-button">
                                <div className="button-left">
                                   {
                                      (!isDisabled) ?
                                        (
                                            <Link to="/cate/add" className="btn btn-primary mb-5">
                                                <i className="glyphicon glyphicon-plus"></i> Thêm Sản Phẩm
                                            </Link>
                                        ):
                                        (
                                            <div>
                                            </div>
                                        )
                                   } 
                                </div>
                                <div className="button-right" >
                                    <Button style={{float:'right'}} onClick={logout}>Đăng xuất</Button>
                                </div>
                                <div className="button-right" >
                                    <Form inline onSubmit={this.searchHandle}>
                                        <FormGroup controlId="formInlineName">
                                            <FormControl onChange={this.onChange} type="text" name="iSearch" ref="iSearch" placeholder="Search by word..." />
                                        </FormGroup>{' '}
                                        <Button type="submit">Search</Button>
                                    </Form>
                                </div>
                            </div>
                            <br/> <br/>  <br/>
                           <div style={{width:'100%',marginTop:'30px',}}>
                           <MyTable styleTable="TABLE_ANTD" data={categorys} col={myCol} ObjSetting={objSetting}/>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        :
        (<div>
            <h1 style={{color:'red'}}>Đã gặp sự cố, bạn vui lòng tải lại trang để tiếp tục!!!</h1>
                <Button bsStyle="success" onClick={()=>{
                   window.location.reload();
                }}>Tải lại</Button>
        </div>);
    }

}
const mapStateToProps = state => {
    return {
        categorys: state.categorys_index,
        isFetchingCategory:state.isFetchingCategory,
        scopeOfUser : state.scopeOfUser,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCategory: (pageSize,pageIndex,StringFilter) => {
            dispatch(actFetchCategoryRequest(pageSize,pageIndex,StringFilter));
        },
        searchCategory: (pageSize,pageNow,keywork) => {
            dispatch(searchCategoryRequest(pageSize,pageNow,keywork))
        },
        onDeleteCategory: (id,pageSize,pageIndex,StringFilter) => {
            dispatch(actDeleteCategoryRequest(id,pageSize,pageIndex,StringFilter));
        },
        setScopeOfUser: (scope) => {
            dispatch(setScopeAccess(scope));
        },
        

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CateListPage));
