import React, { Component } from 'react';
import { withRouter,Link} from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import swal from 'sweetalert';
import {actGetAllServiceByOrganId,actFindService,
    actGetAllService,actDeleteServiceByOrganIDRequest, 
    actDeleteServiceRequest, searchServiceRequest,
    actUpdateServiceRequest, actAddServiceRequest} from 'redux/service/actions/index';
import {ACCESS_TOKEN} from 'settings/sessionStorage';

import MyTable from 'components/table/MyTable';
import {updateIndex} from 'settings/settings_key_antd';
import ButtonAntd from 'components/button/ButtonAntd';
import { Input,Icon,Button,Modal,Row } from 'antd';
 
import {actAddUsersRequest} from 'redux/users/actions/index';
import {showNotification} from 'components/notification/Notification';
import MyForm from 'components/MyForm/MyForm';
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
            btnLoadding:false,
        };
    }
    
    showModal = () =>   this.setState({ visible: true }); 
    showModalEdit = (text) =>  {
        console.log(text);
        this.setState({ visibleEdit: true }); 
        var accesstoken = sessionStorage.getItem(ACCESS_TOKEN);
        this.props.findEdit(text,accesstoken);
    } 

    handleAddSubmit = (e,props) => {
        e.preventDefault();
        this.setState({btnLoadding:true});
        const {pageIndex,pageSize,iSearch} = this.state;
        var accesstoken = sessionStorage.getItem(ACCESS_TOKEN);
        this.setState({listPageVisit:[1]});
        props.form.validateFields((err, val) => {
            if (!err) { 
                console.log('Received values of form: ', val);
                this.props.onAddService(val,pageIndex,pageSize,iSearch,accesstoken);
                this.setState({btnLoadding:false,visible:false});
                showNotification("Add rồi bạn nhé","Đợi xíu đi, mình cập nhật UI cho","topRight","success");
            }else{
                this.setState({btnLoadding:false});
            }
        });
        
    }
    handleEditService = (e,props) => {
         e.preventDefault();
        this.setState({btnLoadding:true});
        const {pageIndex,pageSize,iSearch,organSelected} = this.state;
        var accesstoken = sessionStorage.getItem(ACCESS_TOKEN);
        this.setState({listPageVisit:[1]});
        props.form.validateFields((err, val) => {
            if (!err) { 
            console.log('Received values of form: ', val);
            var {organ,itemEditingService} = this.props;
            console.log(itemEditingService);
            (organ!==undefined)?
            this.props.onUpdateService(organ.idOrganization,val,pageIndex,pageSize,iSearch,accesstoken):
            this.props.onUpdateService(itemEditingService.idservice,val,pageIndex,pageSize,iSearch,accesstoken);
            this.setState({btnLoadding:false,visibleEdit:false});
            showNotification("Edit thành công","Bạn vui lòng đợi một tý, mình cập nhật lại DB đã","topRight","success");
          
        }
        });
        
    }
    componentWillMount(){
        var {pageSize,pageIndex,iSearch} = this.state;
        var {organ } = this.props;
        var accesstoken =sessionStorage.getItem(ACCESS_TOKEN);
        (organ===undefined)?
        this.props.fetchAllService(pageSize,pageIndex,iSearch,accesstoken):
        this.props.getAllServiceByOrganID(organ.idOrganization,pageSize,pageIndex,accesstoken);
    }
    onChange=e =>{
        var accesstoken = sessionStorage.getItem(ACCESS_TOKEN);
        var val =e.target.value;
        if(val.trim()===''){
            this.setState({iSearch:"ALL"});
            this.props.fetchAllService(this.state.pageSize,this.state.pageIndex,"ALL",accesstoken);
        }else{
            this.setState({iSearch:e.target.value},function(){
             this.props.searchService(this.state.pageSize,this.state.pageIndex,this.state.iSearch,accesstoken);
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
                this.props.fetchAllService(this.state.pageSize,this.state.pageIndex,"ALL");
            }else{
                console.log(word+" is word search, pageSize: "+this.state.pageSize+" pageInd: "+this.state.pageIndex);
                this.props.searchService(this.state.pageSize,this.state.pageIndex,word);
            }
        }else{
            // console.log("Lỗi này hơi bị ghê!!!");
            this.props.fetchAllService(this.state.pageSize,this.state.pageIndex,"ALL");
        }
        this.setState({
            listPageVisit:[],
            listPageVisitFilter:[],
        });
       
    }
    onDelete = (id) => { 
        var {onDeleteService,onDeleteServiceByOrganID,organ} = this.props;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                var accesstoken = sessionStorage.getItem(ACCESS_TOKEN);
                (organ!==undefined)?
                onDeleteServiceByOrganID(id,organ.idOrganization,this.state.pageSize,this.state.pageIndex,this.state.iSearch,accesstoken):
                onDeleteService(id,this.state.pageSize,this.state.pageIndex,this.state.iSearch,accesstoken);
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    }
    onPageChange=(pageInd)=>{
        var { fetchAllService,searchService } = this.props;
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
                    fetchAllService(
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
                        searchService(
                            this.state.pageSize,
                            this.state.pageIndex,
                            stringFilter
                        );
                    }

                });
            }
    } 
    
    render() {
        var { isFetchingService, myCol,service,itemEditingService} = this.props;
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var isDisabled = false;
        var objSetting={
            loadding:{isFetchingService},
            defaultFilterMethod:this.defaultFilterMethod,
            defaultPageSize:5,
            onPageChange:this.onPageChange,
            onPageSizeChange:this.onPageSizeChange,
            className: "-striped -highlight",
            page:this.state.pageIndex,
            pageSize:this.state.pageSize,
            getObject:()=>{console.log("")}
        }
        var showColService=[
            {
                title: "idservice",
                dataIndex: "idservice",
                key:`idservice${updateIndex()}`,
            },
            {
                title: "Service Name ",
                dataIndex: "serviceName",
                key:`serviceName${updateIndex()}`,
            },
            {
                title: "Edit", 
                key:`Service_idedit${updateIndex()}`,
                dataIndex:"idservice",
                render:(text)  => {
                    
                    return ( 
                        <div className="button-table"> 
                            <Button disabled={isDisabled} onClick={()=>{this.showModalEdit(text);}} type="primary" shape="circle" icon="edit" />
                        </div>
                        )
                }
            },
            {   
                title: "Delete",
                key:`Service_id_del${updateIndex()}`,
                dataIndex:"idservice",
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
            }]
        var showCol=(myCol!==undefined)?myCol:showColService;
        var listFieldEdit=[
            {
                id:"serviceName",
                label:"Service name:",
                description:"Tên service bạn hỗ trợ!",
                icon:"user",
                placeholder:"Enter your service name...",
                required:true,
                message:'Vui lòng nhập service name',
                defaultValue:(itemEditingService!==null)?itemEditingService.serviceName:"",
                event:{
                    onClick:()=>console.log("event onClick "), 
                    onChange:()=>console.log("event onChange "),
                },
                fieldType:{
                    type:"INPUT_TEXT",
                }
            },
            
          ];
        var listButtonEdit=[
            {
                name:"Edit",
                title:"Edit",
                description:"Edit data from your form",
                loading:this.state.btnLoadding,
                events:{
                    onSubmit: ()=>console.log("submit form edit"),
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
        var listButtonAdd=[
            {
                name:"Edit",
                title:"Add",
                description:"Add data from your form",
                loading:this.state.btnLoadding,
                events:{
                    onSubmit: ()=>console.log("submit form Add"),
                },
                styles:{
                    color:'cyan',
                    margin:'5px'
                },
                type:"SUBMIT",
                icon:"add",
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
        
        return (ss===null) ?
        (<div>
               <h1 style={{color:'red'}}>Để xem chức năng này bạn cần phải đăng nhập trước!!!</h1>
               <Link to={'/login'}>
                    <Button bsStyle="success">Đăng nhập</Button>
               </Link>
           </div>)
        :(!service.includes(undefined))?
         (<div className="container-content">
                <Modal
                    visible={this.state.visibleEdit}
                    title="Create a new service"
                    okText="Create"
                    onOk={()=>this.setState({visibleEdit:false})}
                    onCancel={()=>this.setState({visibleEdit:false})}
                    >
                    <Row type="flex" justify="center">
                        <MyForm
                            type="EDIT" 
                            layout="horizontal" 
                            listField={listFieldEdit}
                            onSubmit={this.handleEditService}
                            listButton={listButtonEdit}
                        />
                    </Row>
                </Modal>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="container-table">
                            <div className="row-button">
                                <div className="button-left">
                                   {
                                      (!isDisabled) ?
                                        (<div>
                                           <Button type="primary" onClick={this.showModal}>
                                                <Icon type="user-add" theme="outlined" />Add Service 
                                            </Button>
                                            <Modal
                                                visible={this.state.visible}
                                                title="Create a new service"
                                                okText="Create"
                                                onOk={()=>this.setState({visible:false})}
                                                onCancel={()=>this.setState({visible:false})}
                                                >
                                                <Row type="flex" justify="center">
                                                    <MyForm
                                                        type="EDIT" 
                                                        layout="horizontal" 
                                                        listField={listFieldEdit}
                                                        onSubmit={this.handleAddSubmit}
                                                        listButton={listButtonAdd}
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
                                    <Search
                                        placeholder="Input search text"
                                        onSearch={val=>this.searchHandle(val)}
                                        style={{ width: 200 }}
                                    />
                                </div>
                            </div>
                            <br/> <br/>  <br/>
                           <div style={{width:'100%',marginTop:'30px',}}>
                                <MyTable styleTable="TABLE_ANTD" data={service} col={showCol} ObjSetting={objSetting}/>
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
    console.log(state);
    return {
        isFetchingService:state.isFetchingService,
        scopeOfUser : state.scopeOfUser,
        service: state.service,
        router: state.router,
        itemEditingService:state.itemEditingService
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllService: (pageSize,pageIndex,StringFilter,accesstoken) => {
            dispatch(actGetAllService(pageSize,pageIndex,StringFilter,accesstoken));
        },
        searchService: (pageSize,pageNow,keywork,accesstoken) => {
            dispatch(searchServiceRequest(pageSize,pageNow,keywork,accesstoken))
        },
        onAddService: (service,pageSize,pageIndex,StringFilter,accesstoken) => {
            dispatch(actAddServiceRequest(service,pageSize,pageIndex,StringFilter,accesstoken));
        },
        onDeleteService: (id,pageSize,pageIndex,StringFilter,accesstoken) => {
            dispatch(actDeleteServiceRequest(id,pageSize,pageIndex,StringFilter,accesstoken));
        },
        onDeleteServiceByOrganID: (id,organID,pageSize,pageIndex,StringFilter,accesstoken) => {
            dispatch(actDeleteServiceByOrganIDRequest(id,organID,pageSize,pageIndex,StringFilter,accesstoken));
        },
        onUpdateService:(idservice,val,pageIndex,pageSize,iSearch,accesstoken)=>{
            dispatch(actUpdateServiceRequest(idservice,val,pageIndex,pageSize,iSearch,accesstoken));
        },
        getAllServiceByOrganID:(organID,pageSize,pageNow,accesstoken)=>{
            dispatch(actGetAllServiceByOrganId(organID,pageSize,pageNow,accesstoken));
        },
        findEdit:(serviceID,accesstoken)=>{
            dispatch(actFindService(serviceID,accesstoken));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
