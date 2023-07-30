import React, { useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import './leftPane.scss';

const { Sider } = Layout;

interface LeftPaneProps {}

const LeftPane = (props: LeftPaneProps) => {
  const [collapsed, setCollapsed] = useState(false);
  type MenuItem = Required<MenuProps>['items'][number];
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  };

  const items: MenuItem[] = [
    getItem('Home', '1', <HomeOutlined />),
    getItem('Masters', '2', <UserOutlined />, [
      getItem('Users', '3'),
      getItem('Sites', '4'),
      getItem('Assets', '5'),
    ]),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="h-screen"
    >
      <div className="h-14 flex items-center justify-center">
        <img
          src={
            collapsed
              ? 'https://res.cloudinary.com/dzsifr04l/image/upload/v1667547471/gallery/maximl_logo_white_72ppi_tgr5t8.png'
              : 'https://res.cloudinary.com/dzsifr04l/image/upload/v1667546876/gallery/maximl_logo_with_text_white_36ppi_lghcvs.png'
          }
          className="object-contain w-4/5 h-6"
          alt="Maximl Logo"
        />
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default LeftPane;
