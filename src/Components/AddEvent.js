import React, { useEffect, useState } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {eventActions} from './features/authorize/eventSlice';
import moment from 'moment';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  notification
} from 'antd';


const App = () => {
  const  [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
  
  const {id} = useParams();
  const events = useSelector(state=>state.event.events)

  const formRef = React.createRef();

  useEffect(() => {
    if (id){
        let eventToBeEdited = events.filter(event => parseInt(event.id) === parseInt(id))[0]
        console.log({eventToBeEdited})
        formRef.current.setFieldsValue({
            name: eventToBeEdited.name,
            nickname: eventToBeEdited.nickname,
            occasion: eventToBeEdited.event_type,
            spouse_name: eventToBeEdited.spouse_name,
            family_code_name: eventToBeEdited.family_code_name,
            event_date: moment(eventToBeEdited.event_date)
        })
    } else {
        formRef.current.resetFields()
    }
    
  }, [id])

    
  const dispatch = useDispatch();

  const openNotification = (message, description, duration=2) => {
    api.open({
      message: message,
      description: description,
      duration: duration,
    });
  };

  const onFinish = () => {
    setSubmitBtnLoading(true)
    form.validateFields()
    .then((values) => {

        if(id){
            // this means we are editing the event
            let eventDate = values.event_date.second(0).minute(0).hour(0)
            let event_data = {
                'user_id': loggedInUser.id,
                'name': values.name,
                'nickname': values.nickname,
                'event_type': values.occasion,
                'spouse_name': values.spouse_name,
                'family_code_name': values.family_code_name,
                'event_date': eventDate.toISOString(),
                'id': id
            }
            dispatch(eventActions.updateEvent(event_data));
            openNotification('Event updated!', 'Your event is now updated')
        } else {
            // this means we are creating the event
            let eventDate = values.event_date.second(0).minute(0).hour(0)
            let event_data = {
                'user_id': loggedInUser.id,
                'name': values.name,
                'nickname': values.nickname,
                'event_type': values.occasion,
                'spouse_name': values.spouse_name,
                'family_code_name': values.family_code_name,
                'event_date': eventDate.toISOString(),
                'id': Math.floor(Math.random()*1000000)
            }
            dispatch(eventActions.saveEvent(event_data));
            openNotification('Event saved!', 'Your event is now saved')
            form.resetFields();
        }

        
    })
    .catch((errorInfo) => {
        console.error(errorInfo)
    })
    .finally(() => {
        setSubmitBtnLoading(false)
    })
  }

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
    {contextHolder}
    
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
      ref={formRef}
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

      <Button type="primary" htmlType="submit" loading={submitBtnLoading}>
          {id ? "Update" : "Create"}
      </Button>   
      
    </Form>
    </>
  );
};
export default App;