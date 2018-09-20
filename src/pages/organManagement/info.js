import React from 'react';
import { Redirect ,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import {actAddOrganRequest} from 'redux/organ/actions/index';
import {actFilterUserWithOrgan} from 'redux/users/actions/index';
import {ACCESS_TOKEN} from 'settings/sessionStorage';

import {FormEdit} from 'pages/organManagement/form/formEdit';
import {Button,Row, Col,Icon,Tabs} from 'antd';
// import MyTable from 'components/table/MyTable';
import  Users  from 'pages/usersManagement/users';
import Group from 'pages/groupManagement/group';
import Services from 'pages/servicesManagement/services';
const TabPane = Tabs.TabPane;
class Organ extends React.Component {  
    constructor(props){
        super(props);
        this.state={
           edit:false,
           show:false,
        };
    }
    componentWillMount(){
        // this.props.updateOrgan("null");
       
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var ssOrgan =sessionStorage.getItem('organ');
        if(ss!==null && ssOrgan!==null){
            return <Redirect to={'/organ'} />
        }
    }
    componentDidMount(){
      
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
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const form = this.formRef.props.form;
        // var organ = {}
        this.setState({edit:false});
        form.validateFields((err, values) => {
            if (err) {
                console.log(err);
                return;
            }
            // organ=values;
            console.log('Received values of form: ', values);
            // form.resetFields();
            // this.props.updateOrgan(organ);
        });
    }
    render() {
        
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var ssOrgan =sessionStorage.getItem('organ');
        var {edit,show} = this.state;
        var {users,group,service} =this.props;
        if(ss===null && ssOrgan===null){
            return <Redirect to={'/organ'} />
        }
        var organ =this.props.organ;
        return (edit)?(
            <Row type="flex" justify="center">
                <FormEdit  wrappedComponentRef={this.saveFormRef} Object={organ} handleSubmit={this.handleSubmit}/>
            </Row>
        ):(
            <div> 
                <Row type="flex" justify="center">
                    <Col span={4}>Organzation name: </Col>
                    <Col span={8}>{organ.organName}</Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={4}>Description</Col>
                    <Col span={8}>{organ.description}</Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={4}>Address </Col>
                    <Col span={8}>{organ.address}</Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={4}>Phone number</Col>
                    <Col span={8}>{organ.phoneNumber}</Col>
                </Row>
                <div style={{textAlign:'center'}}>
                    <Button onClick={()=>this.setState({edit:!this.state.edit})} type="primary" >
                        <Icon type="edit" theme="outlined" /> Edit
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
                                defaultActiveKey="1"
                                tabPosition='left'
                                // style={{ height: 220 }}
                                >
                                <TabPane tab={<span><Icon type="users" />User</span>} key="1">
                                     <Users listUser={users}/>
                                </TabPane>
                                <TabPane tab={<span><Icon type="users" />Group</span>} key="2">
                                    <Group listGroup={group}/>
                                </TabPane>
                                <TabPane tab={<span><Icon type="users" />Services</span>} key="3">
                                    <Services listServices={service}/>
                                </TabPane>
                                <TabPane tab={<span><Icon type="users" />Demo</span>} key="4">
                                    I am updating...
                                </TabPane>
                            </Tabs>
                        </div>
                        :<div></div>
                }
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        organs: state.organs,
        users: state.users,
        group:state.group,
        service:state.service,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateOrgan: (organ) => {
            dispatch(actAddOrganRequest(organ));
        },
        filterOrgan: (organ) => {
            dispatch(actFilterUserWithOrgan(organ));
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Organ));
