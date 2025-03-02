import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router'
import '../styles/mainLayout.less';

const { Header, Content, Footer } = Layout;
const items = new Array(4).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));
const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="layout-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: 12,
          background: '#f1f1f1',
        }}
      >
        <div
          style={{
            height: 'calc(100vh - 88px)',
            padding: 16,
            borderRadius: borderRadiusLG,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};
export default MainLayout;