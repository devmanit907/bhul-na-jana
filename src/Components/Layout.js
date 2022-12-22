import React, { useState } from 'react';
import {
 PoweroffOutlined,CalendarOutlined,ContactsOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { authActions } from "./features/authorize/authSlice";
import AddEvent from './AddEvent';
import Dashboard from './Dashboard';
import Login from './LoginForm';
import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;



const LayoutComponent = () => {

  const logedInUser = useSelector((state) => {
    return state.auth.loggedInUser;
  });
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['dashboard'])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()
  const dispatch = useDispatch();




  const items = [
    {
        key: 'dashboard',
        icon: <CalendarOutlined />,
        label: 'Dashboard',
        onClick: () => {
            navigate('/')
            setSelectedKeys(['dashboard'])
        }
    },
    {
        key: 'add-event',
        icon: <ContactsOutlined/>,
        label: 'Add Event',
        onClick: () => {
            navigate('/add-event')
            setSelectedKeys(['add-event'])
        }
    },{
      key: 'log-out',
        icon: <PoweroffOutlined />,
        label: 'Log Out',
        onClick: () => {
          dispatch(authActions.logout(false))
          setSelectedKeys(['log-out'])
        }
    }
]

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={selectedKeys} mode="inline" items={items} selectedKeys={selectedKeys}/>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Hello {logedInUser.firstName} !</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          > 
            
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/add-event' element={<AddEvent />} />
                <Route path='/edit-event/:id' element={<AddEvent />} />
                <Route path='/' element={<Dashboard setSelectedKeys = {setSelectedKeys} />} />
            </Routes>


          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;