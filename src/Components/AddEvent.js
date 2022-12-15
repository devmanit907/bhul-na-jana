import React, { useState } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload
} from 'antd';
const App = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

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
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <Form.Item label="Name">
        <Input name='name' />
      </Form.Item>
      <Form.Item label="Nickname">
        <Input name='nickname' />
      </Form.Item>
      <Form.Item label="Family Code Name">
        <Input name='family-code-name' />
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

      <Form.Item label="Select">
        <Select>
          <Select.Option value="anniversary">Anniversary</Select.Option>
          <Select.Option value="birthday">Birthday</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Spouse Name" help="Fill this in case of Anniversary only.">
        <Input name='spouse-name' />
      </Form.Item>

      <Form.Item label="Event Date">
        <DatePicker />
      </Form.Item>

      
    </Form>
  );
};
export default App;