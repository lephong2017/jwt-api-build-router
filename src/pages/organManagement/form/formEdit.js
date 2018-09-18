import { Form, Input, Tooltip, Icon, Select, Button } from 'antd';
import React from 'react';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    var organData= this.props.Object;
    return (
      <Form onSubmit={this.props.handleSubmit}>
                <FormItem {...formItemLayout} label="Organzation name: ">
            {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the name of collection!' }],
                initialValue:organData.name
            })(
                <Input/>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="Description">
            {getFieldDecorator('description',{ initialValue:organData.describe})(<Input type="textarea"/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Address&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please input your address!', whitespace: true }],
            initialValue:organData.address
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
            initialValue:organData.phoneNumber
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Update</Button>
        </FormItem>
      </Form>
    );
  }
}

export const FormEdit = Form.create()(RegistrationForm);
