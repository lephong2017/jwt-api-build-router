import {Row } from 'antd';
import React from 'react';
import MyForm from 'components/MyForm/MyForm';
import { connect } from 'react-redux';
import { withRouter,Redirect} from 'react-router-dom';
import {handleLogin} from 'redux/users/actions/user';

const listField=[
    {
        id:"username",
        label:"Username:",
        description:"Email của bạn vào là ok!",
        icon:"user",
        placeholder:"Enter your email...",
        required:true,
        message:'Vui lòng nhập username',
        typeValidation:"email",
        messageValidation:'Không phải định dạng email',
        defaultValue:"sa@gmail.com",
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"INPUT_TEXT",
        }
    },
    {
        id:"password",
        label:"Password:",
        description:"Password mà bạn đã đăng ký cho tài khoản này.",
        icon:"lock",
        placeholder:"Enter your password...",
        required:true,
        message:'Vui lòng nhập password',
        defaultValue:"Pass123$",
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"INPUT_PASSWORD",
        }
    },
]
const styles={
    textAlign:'center'
}

class Login extends React.Component {
    state={
        btnLoadding:false,
    }
  handleSubmit = (e,props) => {
    e.preventDefault();
    this.setState({btnLoadding:true});
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var user={
            email:values.username,
            password:values.password
        }
        this.props.handleLogin(user);
      }
    });
  }

  render() {
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
    
      var {accesstoken} = this.props;
      if(accesstoken!==null && accesstoken!==null){
        return <Redirect to={'/home'} />
      }
    return (<Row type="flex" justify="center">
        <MyForm
            type="ADD" 
            layout="horizontal" 
            listField={listField}
            styles={styles}
            onSubmit={this.handleSubmit}
            listButton={listButton}
        />
    </Row>
    );
  }
}
const mapStateToProps = state => {
    return {
        account : state.account,
        accesstoken:state.accesstoken,
        router:state.router,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleLogin: (user) => {
            dispatch(handleLogin(user));
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));