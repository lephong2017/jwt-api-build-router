
import React from 'react';
import {login,logout} from 'utils/securityAPI/apiCaller';
import {ACCESS_TOKEN} from 'settings/sessionStorage';
import { Button } from 'antd';
import {CreateOrganzation,Register} from 'pages/home/form/organzitionPopup';
import { withRouter,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {actAddUsersRequest} from 'redux/users/actions/index';
import {actAddOrganRequest} from 'redux/organ/actions/index';
class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
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
      actAddUsersRequest(user);
    });
  }
  handleCreateOrgan = () => {
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
      actAddOrganRequest(user);
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    var ss =sessionStorage.getItem(ACCESS_TOKEN);
    var ssOrgan =sessionStorage.getItem('organ');
    if(ss!==null && ssOrgan!==null){
      return <Redirect to={'/organ'} />
    }
    console.log(this.props.users);
    return (ss===null) ?
            (<div>
               <h1 style={{color:'red'}}>Để xem chức năng này bạn cần phải đăng nhập trước!!!</h1>
                <Button bsstyle="success" onClick={login}>Đăng nhập</Button> {' '}
                <Button type="primary" onClick={this.showModal}>Đăng ký</Button>
                  <Register
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                  />
           </div>)
           :
    (
      <div>
        <Button type="primary" onClick={this.showModal}>New organization</Button>{' '}
        <CreateOrganzation
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreateOrgan}
        />
        <Button type="primary" onClick={logout}>Đăng xuất</Button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      users:state.users,
     
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      
    createNewUser: (user) => {
          dispatch(actAddUsersRequest(user));
    },
    createNewOrgan: (organ) => {
        dispatch(actAddOrganRequest(organ));
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionsPage));
