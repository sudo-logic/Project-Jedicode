import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Layout,
  Modal,
  Select,
} from 'antd';
import HeaderComponent from '../Header/Header';
import './rightPane.scss';
import dayjs from 'dayjs';
import { dateTimeFormats } from '../../settings/settings';

interface RightPaneProps {}

const { Content } = Layout;

export default function ({}: RightPaneProps) {
  const [open, setOpen] = useState(false);
  return (
    <Layout className="h-screen">
      <HeaderComponent />
      <Content
        className="site-layout-background m-4"
        style={{ padding: 24, minHeight: 360 }}
      >
        <div>
          <span className="font-semibold">
            Date Format Sample(using day.js):{' '}
          </span>
          <span className="mr-2">
            {dayjs(new Date()).format(dateTimeFormats.DATE_TIME)}
          </span>
          <span>//Check RightPane.tsx</span>
        </div>
        <Button
          className="mt-4"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Open Modal
        </Button>
        <Modal
          open={open}
          title="AntD Modal"
          onOk={() => {
            setOpen(!open);
          }}
          onCancel={() => {
            setOpen(!open);
          }}
          centered
          destroyOnClose
        >
          <Form
            layout="vertical"
            onFinish={(values) => {
              console.log('values', values);
            }}
            className="mt-4"
          >
            <Form.Item name="name" label="Project Name">
              <Input placeholder="Project Name" />
            </Form.Item>
            <Form.Item name="type" label="Project Type">
              <Select placeholder="Project Type">
                <Select.Option value="STO">STO</Select.Option>
                <Select.Option value="DM">DM</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="unit" label="Unit">
              <Select placeholder="Unit"></Select>
            </Form.Item>

            <div className="flex">
              <Form.Item
                name="start_date"
                label="Start Date"
                className="w-full"
              >
                <DatePicker
                  placeholder="Start Date"
                  showTime
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                name="end_date"
                label="End Date"
                className="w-full ml-2"
              >
                <DatePicker
                  placeholder="End Date "
                  showTime
                  className="w-full"
                />
              </Form.Item>
            </div>
            <Form.Item name="scheduler_id" label="Scheduler Project ID">
              <Input placeholder="Project ID" />
            </Form.Item>
            <Form.Item name="is_active" valuePropName="checked">
              <Checkbox>Active</Checkbox>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}
