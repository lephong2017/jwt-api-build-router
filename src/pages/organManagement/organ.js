import React, { Component } from 'react';
import { Redirect ,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import {actAddOrganRequest} from 'redux/organ/actions/index';

import {ACCESS_TOKEN} from 'settings/sessionStorage';

import {FormEdit} from './form/formEdit';
import {Button,Row, Col,Icon} from 'antd';
import MyTable from 'components/table/MyTable';
import  Users  from 'pages/usersManagement/users';
class Organ extends Component {  
    constructor(props){
        super(props);
        this.state={
           edit:false,
           show:false,
        };
    }
    componentWillMount(){
        this.props.updateOrgan("null");
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var ssOrgan =sessionStorage.getItem('organ');
        if(ss!==null && ssOrgan!==null){
            return <Redirect to={'/organ'} />
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
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const form = this.formRef.props.form;
        let organ = {}
        // this.setState({edit:false});
        form.validateFields((err, values) => {
            if (err) {
                console.log(err);
                return;
            }
            organ=values;
            console.log('Received values of form: ', values);
            // form.resetFields();
            // this.props.updateOrgan(organ);
        });
    }
    render() {
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var ssOrgan =sessionStorage.getItem('organ');
        var {edit,show} = this.state;
        if(ss===null && ssOrgan===null){
            return <Redirect to={'/organ'} />
        }
        var organ =this.props.organ[0];
        return (edit)?(
            <div className="row">
                <FormEdit  wrappedComponentRef={this.saveFormRef} Object={organ} handleSubmit={this.handleSubmit}/>
            </div>
        ):(
            <div> 
                <Row type="flex" justify="center">
                    <Col span={4}>Organzation name: </Col>
                    <Col span={8}>{organ.name}</Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={4}>Description</Col>
                    <Col span={8}>{organ.describe}</Col>
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
                    <Button onClick={()=>this.setState({show:!this.state.show})} type="primary" >
                        <Icon type="setting" theme="outlined" /> Settings
                    </Button>
                </div>
                {
                    (show)?
                        <div>
                             <Users/>
                        </div>
                        :<div></div>
                }
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        organ: state.organ,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateOrgan: (organ) => {
            dispatch(actAddOrganRequest(organ));
      },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Organ));
