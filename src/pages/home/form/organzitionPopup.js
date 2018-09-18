import { Modal, Form, Input, Select,Radio } from 'antd';
import React from 'react';
import RegistrationForm from './register';
const FormItem = Form.Item;
const Option = Select.Option;
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
export const CreateOrganzation = Form.create()(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="Create a new organization"
            okText="Create"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form  layout="vertical">
              <FormItem {...formItemLayout} label="Name">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input the name of collection!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Description">
                {getFieldDecorator('description')(<Input type="textarea" />)}
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
              <FormItem className="collection-create-form_last-form-item">
                {getFieldDecorator('modifier', {
                  initialValue: 'public',
                })(
                  <Radio.Group>
                    <Radio value="public">Public</Radio>
                    <Radio value="private">Private</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );

  export const Register = Form.create()(  RegistrationForm );