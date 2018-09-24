import { Row } from 'antd';
import React from 'react';
import MyForm from 'components/MyForm/MyForm';
import { connect } from 'react-redux';
import { withRouter,Redirect} from 'react-router-dom';
import {handleRegister} from 'redux/users/actions/user';

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
        defaultValue:'nlphong0107@gmail.com',
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
        description:"Password của bạn vào là ok!",
        icon:"lock",
        placeholder:"Enter your password...",
        required:true,
        message:'Vui lòng nhập passwod',
        typeValidation:"password",
        messageValidation:'password phải có dạng : Aa$',
        defaultValue:'ABCDabcd.0107',
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"INPUT_PASSWORD",
        }
    },
    {
        id:"firstName",
        label:"First name:",
        description:"Họ của bạn là gì?",
        icon:"user",
        placeholder:"Enter your first name.",
        required:true,
        message:'Vui lòng nhập họ của bạn',
        defaultValue:'Phong',
        // typeValidation:"email",
        // messageValidation:'Không phải định dạng email',
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"INPUT_TEXT",
        }
    },
    {
        id:"lastname",
        label:"Last name:",
        description:"Tên của bạn là gì?",
        icon:"user",
        placeholder:"Enter your last name.",
        required:true,
        message:'Vui lòng nhập tên của bạn',
        defaultValue:'Nguyen Le',
        // typeValidation:"email",
        // messageValidation:'Không phải định dạng email',
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"INPUT_TEXT",
        }
    },
    {
        id:"displayName",
        label:"Display name:",
        description:"Tên sẽ hiển thị lên hệ thống mà bạn muốn.",
        icon:"user",
        placeholder:"Enter display name which your want",
        required:true,
        message:'Vui lòng nhập tên hiển thị của bạn',
        defaultValue:'Anh Mập',
        // typeValidation:"email",
        // messageValidation:'Không phải định dạng email',
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"INPUT_TEXT",
        }
    },
    {
        id:"birthday",
        label:"Birthday:",
        description:"Hãy chọn ngày sinh của bạn.",
        icon:"date",
        placeholder:"Enter your birthday",
        required:true,
        message:'Vui lòng chọn ngày sinh của bạn',
        // defaultValue:'1997/07/01',
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"DATE_PICKER",
        }
    },
    {
        id:"address",
        label:"Your address:",
        description:"Địa chỉ của bạn ở đâu?",
        icon:"address",
        placeholder:"Enter your address.",
        required:true,
        message:'Vui lòng nhập địa chỉ của bạn',
        // typeValidation:"email",
        // messageValidation:'Không phải định dạng email',
        defaultValue:'Bình Thuận',
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"TEXT_AREA",
        }
    },
]
const styles={
    textAlign:'center'
}

class Register extends React.Component {
    state={
        btnLoadding:false,
    }
    handleSubmit = (e,props) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            // console.log(err,values);
          if (!err) {
            console.log('Received values of form: ', values.birthday.format('YYYY-MM-DD'));
            var user ={
                email: values.username,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastname,
                birthDay: values.birthday.format('YYYY-MM-DD'),
                address: values.address,
                displayName: values.displayName
              }
            this.props.handleRegister(user);
          }
        });
    }
  render() {
    const listButton=[
        {
            name:"Submit",
            title:"Submit",
            description:"Submit data from your form",
            onClick:()=>console.log("submit"),
            events:()=>console.log("event form"),
            loading:this.state.btnLoadding,
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
            onClick:()=>console.log("back"),
            events:()=>console.log("event form"),
            link:this.props.router.location.pathname,
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
        return <Redirect to={'/login'} />
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
        scopeOfUser : state.scopeOfUser,
        router:state.router
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleRegister: (user) => {
            dispatch(handleRegister(user));
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));