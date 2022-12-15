import React, { useState } from 'react';
import {
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';


import AddEvent from './AddEvent';
import Dashboard from './Dashboard';

const { Header, Content, Footer, Sider } = Layout;



const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()


  const items = [
    {
        key: 'dashboard',
        icon: <UserOutlined />,
        label: 'Dashboard',
        onClick: () => {
            navigate('/')
        }
    },
    {
        key: 'add-event',
        icon: <UserOutlined />,
        label: 'Add Event',
        onClick: () => {
            navigate('/add-event')
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
        <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline" items={items} />
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
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          > 
            
            <Routes>
                <Route path='/add-event' element={<AddEvent />} />
                <Route path='/' element={<Dashboard />} />
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