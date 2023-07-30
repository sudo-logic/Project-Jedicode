import { Layout } from 'antd';
import React from 'react';
import LeftPane from '../../components/LeftPane/LeftPane';
import RightPane from '../../components/RightPane/RightPane';

const Home = () => {
  return (
    <Layout className="h-screen">
      <LeftPane />
      <RightPane />
    </Layout>
  );
};

export default Home;
