import React, { Component } from 'react';
import { withRouter,Link,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import swal from 'sweetalert';
import {actFilterUserWithOrgan} from 'redux/users/actions/index';
import {ACCESS_TOKEN,USERS} from 'settings/sessionStorage';
import {setScopeAccess} from 'redux/categoryManagement/actions/cates';

import MyTable from 'components/table/MyTable';
import {updateIndex} from 'settings/settings_key_antd';
import { Input,Icon,Button,Row,Col ,Tabs,Modal } from 'antd';
import ButtonAntd from 'components/button/ButtonAntd';
import {showNotification} from 'components/notification/Notification';
import {actFetchOrganRequest,searchOrganRequest,actAddOrganRequest,actUpdateOrganRequest,actDeleteOrganRequest} from 'redux/organ/actions/index';

import {actFilterGroupWithOrgan} from 'redux/group/actions/index';
import {actDeleteServiceRequest} from 'redux/service/actions/index';
import {handleLogout} from 'redux/users/actions/user';
import MyForm from 'components/MyForm/MyForm';
import Service from 'pages/servicesManagement/services';
const Search = Input.Search;   
const TabPane = Tabs.TabPane;
const listFieldAddOrgan=[
    {
        id:"nameOrganization",
        label:"Organization name:",
        description:"Tên của tổ chức bạn!",
        icon:"user",
        placeholder:"Enter your organization name...",
        required:true,
        message:'Vui lòng nhập organization name',
        defaultValue:"Proptech Plus",
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"INPUT_TEXT",
        }
    },
    {
        id:"displayNameDb",
        label:"Database name:",
        description:"Bạn cần đặt tên database cho tổ chức bạn.",
        icon:"lock",
        placeholder:"Enter your database name...",
        required:true,
        message:'Vui lòng nhập database name',
        defaultValue:"proptechplusDB",
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"INPUT_TEXT",
        }
    },
  ]
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
            organSelected:null,
            show:false,
            edit:false,
            btnLoadding:false,
        };
    }
    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    componentWillMount(){
        var {pageSize,pageIndex,iSearch} = this.state;
        var ss =sessionStorage.getItem(USERS);
        var accesstoken =sessionStorage.getItem(ACCESS_TOKEN);
        if(ss!==null && accesstoken!=null){
            this.props.fetchingAllOrgan(pageSize,pageIndex,iSearch);
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
        word=e;
        var accesstoken= sessionStorage.getItem(ACCESS_TOKEN);
        if(word!==''){
            if(word==='ALL'){
                this.props.fetchingAllOrgan(this.state.pageSize,this.state.pageIndex,"ALL",accesstoken);
            }else{
                this.props.searchOrgan(this.state.pageSize,this.state.pageIndex,word,accesstoken);
            }
        }else{
            // console.log("Lỗi này hơi bị ghê!!!");
            this.props.fetchingAllOrgan(this.state.pageSize,this.state.pageIndex,"ALL",accesstoken);
        }
        this.setState({
            listPageVisit:[],
            listPageVisitFilter:[],
        });
       
    }
    onDelete = (id) => { 
        showNotification("Xóa rồi","Đợi xíu đi","topRight","success");
        var accesstoken = sessionStorage.getItem(ACCESS_TOKEN);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.props.deleteOrgan(id,this.state.pageSize,this.state.pageIndex,this.state.iSearch,accesstoken);
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    }
    onPageChange=(pageInd)=>{
        var { fetchingAllOrgan,searchOrgan } = this.props;
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
                    fetchingAllOrgan(
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
                        searchOrgan(
                            this.state.pageSize,
                            this.state.pageIndex,
                            stringFilter
                        );
                    }

                });
            }
    } 
    getOrgan=(organ)=>{
        this.setState({organSelected:organ,show:false});
        //  this.props.filterOrgan(organ);
        //  this.props.filterGroup(organ);
    }
    handleSubmit = (e,props) => {
        showNotification("Edit rồi","Đợi xíu đi","topRight","success");
        e.preventDefault();
        this.setState({btnLoadding:true});
        const {pageIndex,pageSize,iSearch,organSelected} = this.state;
        var accesstoken = sessionStorage.getItem(ACCESS_TOKEN);
        this.setState({listPageVisit:[1]});
        props.form.validateFields((err, val) => {
          if (!err) { 
            console.log('Received values of form: ', val);
            this.props.updateOrgan(organSelected.idOrganization,val,pageIndex,pageSize,iSearch,accesstoken);
            this.setState({btnLoadding:false,visible:false,edit:false,organSelected:null});
          }
        });
        
      }

    handleAddOrgan = (e,props) => {
        showNotification("Add rồi","Đợi xíu đi","topRight","success");
        e.preventDefault();
        this.setState({btnLoadding:true});
        const {pageIndex,pageSize,iSearch} = this.state;
        props.form.validateFields((err, organ) => {
            if (!err) {
                console.log('Received values of form: ', organ);
                this.props.createNewOrgan(organ,pageIndex,pageSize,iSearch,this.props.accesstoken);
                this.setState({btnLoadding:false,visible:false});
            }
        });
        
    }
    render() {
        var { isFetchingCategory,categorys,organs } = this.props;
        var username =sessionStorage.getItem(USERS);
        var {organSelected,edit,show} = this.state;
        var isDisabled = false;
        var objSetting={
            loadding:{isFetchingCategory},
            defaultFilterMethod:this.defaultFilterMethod,
            defaultPageSize:5,
            onPageChange:this.onPageChange,
            onPageSizeChange:this.onPageSizeChange,
            className: "-striped -highlight",
            page:this.state.pageIndex,
            pageSize:this.state.pageSize,
            getObject:this.getOrgan
        }
         var  organCol=[
             {
                 title: "id",
                 dataIndex: "idOrganization",
                 key:`idOrganization${updateIndex()}`,
             },
            {
                title: "Name",
                dataIndex: "nameOrganization",
                key:`nameOrganization${updateIndex()}`,
            },
            {
                title: "Display Name Database",
                dataIndex: "displayNameDb",
                key:`displayNameDb${updateIndex()}`,
            },
            // {
            //     title: "Edit", 
            //     key:`id${updateIndex()}`,
            //     dataIndex:"id",
            //     align:'center',
            //     render:(text)  => {
            //         return (
            //             <div className="button-table"> 
            //                 <Button disabled={isDisabled} onClick={this.showModalEdit} type="primary" shape="circle" icon="edit" />
            //             </div>
            //             )
            //     }
            // },
         ];
         const listButton=[
            {
                name:"Submit",
                title:"Submit",
                description:"Submit data from your form",
                loading:this.state.btnLoadding,
                events:{
                    onSubmit: ()=>console.log("submit form login"),
                },
                styles:{
                    color:'cyan',
                    margin:'5px'
                },
                type:"SUBMIT",
                icon:"save",
                typeButon:"primary"
            },
            {
                name:"Back",
                title:"Back",
                description:"Back",
                // link:this.props.router.location.pathname,
                onClick:()=>this.setState({edit:false}),
                events:()=>console.log("event form"),
                styles:{
                    color:'red',
                    margin:'5px'
                },
                type:"BACK",
                icon:"rollback",
                typeButon:"primary"
            },
        ]
         const listField=[
            {
                id:"nameOrganization",
                label:"Organization name:",
                description:"Tên của tổ chức bạn!",
                icon:"user",
                placeholder:"Enter your organization name...",
                required:true,
                message:'Vui lòng nhập organization name',
                defaultValue:(organSelected!==null)?organSelected.nameOrganization:"",
                event:{
                    onClick:()=>console.log("event onClick "),
                    onChange:()=>console.log("event onChange "),
                },
                fieldType:{
                    type:"INPUT_TEXT",
                }
            },
            {
                id:"displayNameDB",
                label:"Database name:",
                description:"Bạn cần đặt tên database cho tổ chức bạn.",
                icon:"lock",
                placeholder:"Enter your database name...",
                required:true,
                message:'Vui lòng nhập database name',
                defaultValue:(organSelected!==null)?organSelected.displayNameDb:"",
                event:{
                    onClick:()=>console.log("event onClick "),
                    onChange:()=>console.log("event onChange "),
                },
                fieldType:{
                    type:"INPUT_TEXT",
                }
            },
          ];
         const listButtonOrgan=[
            {
                name:"Submit",
                title:"Submit",
                description:"Submit data from your form",
                loading:this.state.btnLoadding,
                events:{
                    onSubmit: ()=>console.log("submit form login"),
                },
                styles:{
                    color:'cyan',
                    margin:'5px'
                },
                type:"SUBMIT",
                icon:"save",
                typeButon:"primary"
            },
            {
                name:"Back",
                title:"Back",
                description:"Back",
                link:this.props.router.location.pathname,
                onClick:()=>console.log("back"),
                events:()=>console.log("event form"),
                styles:{
                    color:'red',
                    margin:'5px'
                },
                type:"BACK",
                icon:"rollback",
                typeButon:"primary"
            },
        ]
        
        const serviceCol=[
            {
                title: "Service Name ",
                dataIndex: "serviceName",
                key:`serviceName${updateIndex()}`,
            },
            {
                title: "Expire Date",
                dataIndex: "expireDate",
                key:`expireDate${updateIndex()}`,
            },
            {
                title: "Max",
                dataIndex: "lincenseAmount",
                key:`lincenseAmount${updateIndex()}`,
            },
            {
                title: "Avalible",
                dataIndex: "license__available",
                key:`license__available${updateIndex()}`,
            },
            {
                title: "Used",
                dataIndex: "license__used",
                key:`license__used${updateIndex()}`,
            },
            {   
                title: "Delete",
                key:`Service_id_del${updateIndex()}`,
                dataIndex:"Service_id",
                render: (text) => {
                    return (
                        <div  className="button-table"> 
                            <ButtonAntd 
                                isDisabled={isDisabled} 
                                size="small"  acttype='DELETE' 
                                onClickComponent={()=>{this.onDeleteService(text);}}
                                />
                        </div>
                        )
                } 
            }]
        return (username===null) ?
            (<div>
               <h1 style={{color:'red'}}>Để xem chức năng này bạn cần phải đăng nhập trước!!!</h1>
               <Link to={"/login"}>
                    <Button bsStyle="success" >Đăng nhập</Button>
               </Link>
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
                                        (<div>
                                            <Button type="primary" onClick={this.showModal}>
                                                <Icon type="user-add" theme="outlined" />Add Organzation 
                                            </Button>
                                            <Modal
                                                visible={this.state.visible}
                                                title="Create a new organization"
                                                okText="Create"
                                                onOk={()=>this.setState({visible:false})}
                                                onCancel={()=>this.setState({visible:false})}
                                                >
                                                <Row type="flex" justify="center">
                                                    <MyForm
                                                        type="ADD" 
                                                        layout="horizontal" 
                                                        listField={listFieldAddOrgan}
                                                        onSubmit={this.handleAddOrgan}
                                                        listButton={listButtonOrgan}
                                                    />
                                                </Row>
                                            </Modal>
                                        </div>
                                        ):
                                        (
                                            <div>
                                            </div>
                                        )
                                   } 
                                </div>
                                <div className="button-right" >
                                    <Button style={{float:'right'}} onClick={()=>handleLogout(username)}>Đăng xuất</Button>
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
                            <Row type="flex" justify="center">
                                <div style={{width:'100%',margin:'10px',}}>
                                    <MyTable styleTable="TABLE_ANTD" data={organs} col={organCol} ObjSetting={objSetting}/>
                                </div>
                                {
                                    (organSelected!==null)?
                                    <div style={{width:'100%',margin:'10px',}}>
                                     {   
                                    (edit)?(
                                        <Row type="flex" justify="center">
                                            <MyForm
                                                type="EDIT" 
                                                layout="vertical" 
                                                listField={listField}
                                                onSubmit={this.handleSubmit}
                                                listButton={listButton}
                                            />
                                        </Row>
                                    ):(
                                        <div> 
                                            <Row type="flex" justify="center">
                                                <Col span={6}>Organzation name: </Col>
                                                <Col span={6}>{organSelected.nameOrganization}</Col>
                                            </Row>
                                            <Row type="flex" justify="center">
                                                <Col span={6}>Display database name: </Col>
                                                <Col span={6}>{organSelected.displayNameDb}</Col>
                                            </Row>
                                            <div style={{textAlign:'center'}}>
                                                <Button onClick={()=>this.setState({edit:!this.state.edit})} type="primary" >
                                                    <Icon type="edit" theme="outlined" /> Edit
                                                </Button>{'  '}
                                                <Button onClick={()=>this.onDelete(organSelected.idOrganization)} type="primary" >
                                                    <Icon type="delete" theme="outlined" /> Delete
                                                </Button>{'  '}
                                                <Button onClick={()=>{
                                                        this.setState({show:!this.state.show});
                                                    }} type="primary" >
                                                    <Icon type="setting" theme="outlined" /> Settings
                                                </Button>
                                            </div>
                                            {
                                                (show)?
                                                    <div>
                                                        <Tabs
                                                            defaultActiveKey="3"
                                                            tabPosition='left'
                                                            >
                                                            <TabPane tab={<span><Icon type="users" />User</span>} key="1">
                                                                {/* <Users listUser={users}/> */}
                                                            </TabPane>
                                                            <TabPane tab={<span><Icon type="users" />Group</span>} key="2">
                                                                {/* <Group listGroup={group}/> */}
                                                            </TabPane>
                                                            <TabPane tab={<span><Icon type="users" />Services</span>} key="3">
                                                                <Service organ={organSelected} myCol={serviceCol}/>
                                                            </TabPane>
                                                        </Tabs>
                                                    </div>
                                                    :<div></div>
                                            }
                                        </div>
                                    )
                                }
                                    </div>
                                    : <div> </div>
                                }
                            </Row>
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
        organs: state.organs,
        account:state.account,
        router:state.router,
        accesstoken:state.accesstoken
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        searchOrgan: (pageSize,pageNow,keywork,accesstoken) => {
            dispatch(searchOrganRequest(pageSize,pageNow,keywork,accesstoken))
        },
        deleteOrgan: (id,pageSize,pageIndex,iSearch,accesstoken) => {
            dispatch(actDeleteOrganRequest(id,pageSize,pageIndex,iSearch,accesstoken))
        },

        setScopeOfUser: (scope) => {
            dispatch(setScopeAccess(scope));
        },
        fetchingAllOrgan:(pageSize,pageIndex,StringFilter)=>{
            dispatch(actFetchOrganRequest(pageSize,pageIndex,StringFilter));
        },
        filterOrgan: (organ) => {
            dispatch(actFilterUserWithOrgan(organ));
        },
        filterGroup:(organ)=>{
            dispatch(actFilterGroupWithOrgan(organ));
        },
        updateOrgan: (idOrganzination,Organ,pageIndex,pageSize,StringFilter,accesstoken) => {
            dispatch(actUpdateOrganRequest(idOrganzination,Organ,pageIndex,pageSize,StringFilter,accesstoken));
        },
        createNewOrgan: (organ,pageIndex,pageSize,StringFilter,accesstoken) => {
            dispatch(actAddOrganRequest(organ,pageIndex,pageSize,StringFilter,accesstoken));
        },
        onDeleteService: (id,pageSize,pageIndex,StringFilter,accesstoken) => {
            dispatch(actDeleteServiceRequest(id,pageSize,pageIndex,StringFilter,accesstoken));
        },

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
