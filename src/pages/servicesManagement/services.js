import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import swal from 'sweetalert';
import {actFetchCategoryRequest, actDeleteCategoryRequest, searchCategoryRequest} from 'redux/categoryManagement/actions/index';
import {actGetAllServiceByOrganId} from 'redux/service/actions/index';
import {login,logout} from 'utils/securityAPI/apiCaller';
import {ACCESS_TOKEN} from 'settings/sessionStorage';
import {setScopeAccess} from 'redux/categoryManagement/actions/cates';

import MyTable from 'components/table/MyTable';
import {updateIndex} from 'settings/settings_key_antd';
import ButtonAntd from 'components/button/ButtonAntd';
import { Input,Icon,Button } from 'antd';
 
import {actAddUsersRequest} from 'redux/users/actions/index';
import {Register} from './action/add';
import {RegisterEdit} from './action/edit';
import {showNotification} from 'components/notification/Notification';
import SetRole from './action/role';
const Search = Input.Search;

class Users extends Component {  
    constructor(props){
        super(props);
        this.state={
            iSearch:"ALL",
            pageSize:5,
            pageIndex:1,
            listPageVisit:[1],
            listPageVisitFilter:[1],
            visible: false,
            visibleEdit: false,
        };
    }
    
    showModal = () =>   this.setState({ visible: true }); 
    showModalEdit = () =>  this.setState({ visibleEdit: true }); 
    handleCancel = () =>  this.setState({ visible: false }); 
    saveFormRef = (formRef) =>  this.formRef = formRef; 
    saveFormRefEdit = (formRef) =>  this.formRef = formRef; 

    handleCreate = () => {
        showNotification("THêm rồi","Đợi xíu đi nhen","topRight","success");
        const form = this.formRef.props.form;
        let user = {}
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            user=values;
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
            showNotification("Success","Đã gọi API rồi, yên tâm đi, đợi xí!!!","topRight","success");
            actAddUsersRequest(user);
        });
        
    }
    handleCancelEdit = () =>   this.setState({ visibleEdit: false });  

    handleEdit = () => {
        showNotification("Edit rồi","Đợi xíu đi","topRight","success");
        const form = this.formRef.props.form;
        let user = {}
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            user=values;
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
            showNotification("Success","Đã gọi API rồi, yên tâm đi, đợi xí!!!","topRight","success");
            actAddUsersRequest(user);
        });
        
    }

    
    componentWillMount(){
        this.props.getAllServiceByOrganID(this.props.organID);
        var {pageSize,pageIndex,iSearch} = this.state;
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var obj = JSON.parse(ss);
        if(ss!==null){
            this.props.fetchAllCategory(pageSize,pageIndex,iSearch);
            this.props.setScopeOfUser(obj.profile['name']);
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
        // e.preventDefault();
        var word = this.state.iSearch;
        console.log(e);
        word=e;
        if(word!==''){
            if(word==='ALL'){
                this.props.fetchAllCategory(this.state.pageSize,this.state.pageIndex,"ALL");
            }else{
                console.log(word+" is word search, pageSize: "+this.state.pageSize+" pageInd: "+this.state.pageIndex);
                this.props.searchCategory(this.state.pageSize,this.state.pageIndex,word);
            }
        }else{
            // console.log("Lỗi này hơi bị ghê!!!");
            this.props.fetchAllCategory(this.state.pageSize,this.state.pageIndex,"ALL");
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
    
    render() {
        var { isFetchingCategory,categorys,scopeOfUser ,service} = this.props;
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
            pageSize:this.state.pageSize,
            getObject:()=>{console.log("")}
        }
        var myCol=[
            {
                title: "ID",
                dataIndex: "id",
                key:`id${updateIndex()}`,
            },
            {
                title: "Name",
                dataIndex: "name",
                key:`name${updateIndex()}`,
            },
            {
                title: "Description",
                dataIndex: "description",
                key:`description${updateIndex()}`,
            },
            {
                title: "Max",
                dataIndex: "max",
                key:`max${updateIndex()}`,
            },
            {
                title: "Avalible",
                dataIndex: "avaliable",
                key:`avaliable${updateIndex()}`,
            },
            {
                title: "Used",
                dataIndex: "used",
                key:`used${updateIndex()}`,
            },
            {
                title: "Edit", 
                key:`edit${updateIndex()}`,
                dataIndex:"id",
                render:(text)  => {
                    return (
                        <div className="button-table"> 
                                <Button disabled={isDisabled} onClick={this.showModalEdit} type="primary" shape="circle" icon="edit" />
                        </div>
                        )
                }
            },
            {   
                title: "Delete",
                key:`id${updateIndex()}`,
                dataIndex:"id",
                render: (text) => {
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
          <RegisterEdit
                wrappedComponentRef={this.saveFormRefEdit}
                visible={this.state.visibleEdit}
                onCancel={this.handleCancelEdit}
                onCreate={this.handleEdit}
            />
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="container-table">
                            <div className="row-button">
                                <div className="button-left">
                                   {
                                      (!isDisabled) ?
                                        (<div>
                                            <Button type="primary" onClick={this.showModal}>
                                                <Icon type="user-add" theme="outlined" />Add Services 
                                            </Button>
                                            <Register
                                              wrappedComponentRef={this.saveFormRef}
                                              visible={this.state.visible}
                                              onCancel={this.handleCancel}
                                              onCreate={this.handleCreate}
                                            />
                                        </div>
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
                                    <Search
                                        placeholder="Input search text"
                                        onSearch={val=>this.searchHandle(val)}
                                        style={{ width: 200 }}
                                    />
                                </div>
                            </div>
                            <br/> <br/>  <br/>
                           <div style={{width:'100%',marginTop:'30px',}}>
                                <MyTable styleTable="TABLE_ANTD" data={service} col={myCol} ObjSetting={objSetting}/>
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
        service: state.service,
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
        getAllServiceByOrganID:(organID)=>{
            dispatch(actGetAllServiceByOrganId(organID));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
