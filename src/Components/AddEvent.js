import React, { useState } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload
} from 'antd';
import moment from 'moment';
import saveEvent from '../storage/saveEvent';
const App = () => {
  const  [form] = Form.useForm();

  const onFinish = () => {
    form.validateFields()
    .then((values) => {
        console.log({values});
        let event_data = {
            'name': values.name,
            'nickname': values.nickname,
            'event_type': values.occasion,
            'spouse_name': values.spouse_name,
            'family_code_name': values.family_code_name,
            'event_date': moment(values.event_date).add(0, 'hour').add(0, 'minute').add(0, 'seconds').utc().toISOString()
        }
        saveEvent(event_data)
    })
    .catch((errorInfo) => {
        console.error(errorInfo)
    });
  }

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      onFinish={onFinish}
      form={form}
    >
      <Form.Item label="Name"  name='name'>
        <Input />
      </Form.Item>
      <Form.Item label="Nickname"  name='nickname'>
        <Input />
      </Form.Item>
      <Form.Item label="Family Code Name"  name='family_code_name'>
        <Input />
      </Form.Item>

      <Form.Item
        name="profile-pic"
        label="Upload Profile Picture "
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Select" name="occasion">
        <Select>
          <Select.Option value="anniversary">Anniversary</Select.Option>
          <Select.Option value="birthday">Birthday</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Spouse Name" help="Fill this in case of Anniversary only."  name='spouse_name'>
        <Input />
      </Form.Item>

      <Form.Item label="Event Date" name='event_date'>
        <DatePicker />
      </Form.Item>

      <Button type="primary" htmlType="submit">
          Submit
      </Button>   
      
    </Form>
  );
};
export default App;