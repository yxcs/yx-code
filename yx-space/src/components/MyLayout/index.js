import React, { useState, useEffect } from 'react';
import { HomeOutlined, ToolOutlined, PictureOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo_1_03a05e_small.png'
import { treeFindPath } from '../../utils/tree';

import './index.less'

const { Header, Content, Sider } = Layout;

const headerMenu = [
  {
    label: '管理系统',
    key: 'sys_manage',
  },
  {
    label: '图片系统',
    key: 'img_manage',
  },
  {
    label: '文章系统',
    key: 'art_manage',
  },
]

const siderMenu = [
  {
    label: '首页',
    key: 'sys_manage_home',
    icon: <HomeOutlined />,
  },
  {
    label: '工具',
    key: 'sys_manage_tool',
    icon: <ToolOutlined />,
    children: [
      {
        label: '颜色管理',
        key: 'sys_manage_tool_color',
      },
      {
        label: '进制管理',
        key: 'sys_manage_tool_binary',
      }
    ],
  },
  {
    label: '图片管理',
    key: 'sys_manage_pic',
    icon: <PictureOutlined />,
  },
];

const breadcrumbStack = [
  {
    label: '首页',
    key: 'sys_manage_home',
    icon: <HomeOutlined />,
  },
  {
    label: '工具',
    key: 'sys_manage_tool',
    icon: <ToolOutlined />,
    children: [
      {
        label: '颜色管理',
        key: 'sys_manage_tool_color',
        children: [
          {
            label: '颜色编辑',
            key: 'sys_manage_tool_color_edit',
          },
        ],
      },
      {
        label: '进制管理',
        key: 'sys_manage_tool_binary',
      }
    ],
  },
  {
    label: '图片管理',
    key: 'sys_manage_pic',
    icon: <PictureOutlined />,
  },
];

const routePaths = {
  'sys_manage_home': '/',
  'sys_manage_tool_color': '/about',
  'sys_manage_tool_binary': '/article',
  'sys_manage_tool_color_edit': '/about/edit',
  'sys_manage_pic': '/pic',
};

const MyLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();
  const [headerKey, setHeaderKey] = useState('sys_manage');
  const [menuKey, setMenuKey] = useState('/');
  const [routeItems, setRouteItems] = useState([{ path: '/', title: '首页' }]);

  const onHeaderMenuSelect = event => {
    setHeaderKey(event.key);
    navigate(routePaths[event.key] || '/');
  };

  const onSiderMenuSelect = ({ key }) => {
    getBreadcrumbRoutes(key)
    setMenuKey(key);
    navigate(routePaths[key] || '/');
  }

  const routerRender = (item, params, items, paths) => {
    const last = items.indexOf(item) === items.length - 1;
    const first = items.indexOf(item) === 0;
    return (first || last) ? <span>{item.title}</span> : <Link to={paths.join('/')}>{item.title}</Link>;
  }

  const getBreadcrumbRoutes = key => {
    const routePath = treeFindPath(breadcrumbStack, route => route.key === key);
    const arr = routePath.map(item => ({
      title: item.label,
      path: routePaths[item.key],
    }));
    setRouteItems(arr);
  };

  useEffect(() => {
    const { pathname } = location;
    let currentKey = '';
    for (const key in routePaths) {
      if (pathname === routePaths[key]) {
        currentKey = key;
        break;
      }
    }
    if (currentKey !== menuKey) {
      getBreadcrumbRoutes(currentKey);
      setMenuKey(currentKey);
    }
  }, [location]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: colorBgContainer,
        }}
      >
        <div style={{
          width: 64,
          height: 64,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <img style={{
            width: 48,
            height: 48,
          }} src={logo} alt="logo" />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={headerMenu}
          style={{
            flex: 1,
            minWidth: 0,
            background: colorBgContainer,
          }}
          selectedKeys={[headerKey]}
          onSelect={onHeaderMenuSelect}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={siderMenu}
            selectedKeys={[menuKey]}
            onSelect={onSiderMenuSelect}
            ismenu="true"
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb style={{ margin: '8px 0' }} itemRender={routerRender} items={routeItems} />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MyLayout;