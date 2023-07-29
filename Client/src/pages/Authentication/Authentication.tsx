import { BankOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { BASE_URL } from '../../env';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useAppDispatch } from '../../state/hooks';
import { login, setUser } from '../../state/reducers/authReducer/authReducer';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './authentication.scss';

const Authentication = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formatDate = () => {
    return dayjs(new Date()).format('D-M-YY-dddd'); //30-5-22-Monday
  };
  const onFinish = async (values: any) => {
    setLoading(true);
    navigate('/home');
    // const { email, password, company } = values;
    // const credentials = { email, password, company };
    // let url = URL + `/auth/signin`;

    // try {
    //   const response = await axios.post(url, credentials, company);
    //   if (response.data['x-tenant-id']) {
    //     localStorage.setItem(
    //       'x-tenant-id',
    //       response.data['x-tenant-id'].toString()
    //     );
    //   }
    //   if (response.data.accessToken) {
    //     localStorage.setItem('accessToken', response.data.accessToken);
    //     localStorage.setItem('refreshToken', response.data.refreshToken);
    //     localStorage.setItem(
    //       'x-tenant-id',
    //       response.data['x-tenant-id'].toString()
    //     );
    //     message.success('Login Successful!');
    //     dispatch(login(''));
    //     dispatch(setUser(jwt_decode(response.data.accessToken)));
    //   }
    //   setLoading(false);
    // } catch (error: any) {
    //   if (error.response.status === 401) {
    //     message.error('Wrong Credentials!');
    //   } else if (error.response.status === 404) {
    //     message.error('Invalid Tenant!');
    //   } else {
    //     message.error(error.message);
    //   }
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center w-1/2">
        <div className="flex justify-center mb-5">
          <img
            className="w-52 object-contain h-24"
            src="https://maximl.com/wp-content/uploads/2020/10/MaximlLOGO.png"
            alt="Logo"
          />
        </div>
        <Form
          name="normal_login"
          className="w-[300px]"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="company"
            rules={[{ required: true, message: 'Please input your company' }]}
          >
            <Input
              prefix={<BankOutlined className="site-form-item-icon" />}
              placeholder="Company"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="max-md:h-1/2 max-md:w-full w-1/2">
        <div className="cover-image max-md:h-full w-full h-screen"></div>

        <div className="absolute bottom-0 pb-10 pl-10">
          <img
            src="https://res.cloudinary.com/maximl-prod/image/upload/w_auto,f_auto,c_scale/v1643614769/login/line_nne4rc.jpg"
            alt=""
          />

          <div className="font-lato-bold text-neutral-1 pt-3 text-2xl text-white">
            Maximl React Boilerplate
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
