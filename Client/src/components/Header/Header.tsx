import {
  Layout,
  Dropdown,
  Avatar,
  Menu,
  MenuProps,
  Typography,
  theme,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { logout } from '../../state/reducers/authReducer/authReducer';
const { Header } = Layout;

interface HeaderProps {}

export default function HeaderComponent(props: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '3') {
      dispatch(logout(''));
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: (
            <span className="flex flex-col">
              <span className="font-semibold">Admin</span>
              admin@maximl.com
            </span>
          ),
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: <span>Log Out</span>,
          key: '3',
        },
      ]}
    />
  );

  return (
    <Header
      style={{ background: colorBgContainer }}
      className="site-layout-background flex items-center justify-between !h-12 !px-5"
    >
      <div className="flex flex-row text-xl">
        <Typography.Text>Home</Typography.Text>
      </div>
      <Dropdown overlay={menu} trigger={['click']}>
        <div
          onClick={(e) => e.preventDefault()}
          className="flex items-center cursor-pointer"
        >
          <Avatar
            className="hover:scale-110 transition ease-in-out delay-100"
            style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          >
            A
          </Avatar>
          <span className="ml-2">Admin</span>
        </div>
      </Dropdown>
    </Header>
  );
}
