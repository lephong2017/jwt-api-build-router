import { Form,Modal, Input, Tooltip, Icon, Select, Checkbox } from 'antd';
import React from 'react';
const FormItem = Form.Item;
const Option = Select.Option;

export default class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
            title="Edit infor account"
            okText="Create"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form onSubmit={this.onCreate}>
            <FormItem
            {...formItemLayout}
            label="E-mail"
            >
            {getFieldDecorator('email1', {
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
            label={(
                <span>
                Display name&nbsp;
                <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            )}
            >
            {getFieldDecorator('nickname1', {
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
            {getFieldDecorator('agreement1', {
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
export const RegisterEdit = Form.create()(  RegistrationForm );


