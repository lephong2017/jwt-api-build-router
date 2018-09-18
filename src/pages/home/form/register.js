import { Form,Modal, Input, Tooltip, Icon, Select, Checkbox } from 'antd';
import React from 'react';
const FormItem = Form.Item;
const Option = Select.Option;

export default class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const { visible, onCancel, onCreate } = this.props;
    return (
        <Modal
            visible={visible}
            title="Create a new account"
            okText="Create"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form onSubmit={this.handleSubmit}>
            <FormItem
            {...formItemLayout}
            label="E-mail"
            >
            {getFieldDecorator('email', {
                rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
                }, {
                required: true, message: 'Please input your E-mail!',
                }],
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="Password"
            >
            {getFieldDecorator('password', {
                rules: [{
                required: true, message: 'Please input your password!',
                }, {
                validator: this.validateToNextPassword,
                }],
            })(
                <Input type="password" />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="Confirm Password"
            >
            {getFieldDecorator('confirm', {
                rules: [{
                required: true, message: 'Please confirm your password!',
                }, {
                validator: this.compareToFirstPassword,
                }],
            })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label={(
                <span>
                Display name&nbsp;
                <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            )}
            >
            {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="Select type of user"
            hasFeedback
            validateStatus="success"
            >
            <Select defaultValue="OWNER">
                <Option value="OWNER">Owner</Option>
                <Option value="CUSTOMER">Customer</Option>
            </Select>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
                valuePropName: 'checked',
            })(
                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
            )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
            </FormItem>
        </Form>
        
        </Modal>
      );
  }
}
