// import { Button } from 'antd';
// import { useSolution } from 'react-solution';
// import { useNavigate } from 'react-router-dom';
// import { SESSION_STORE } from '@src/auth/session-store/token';
// import { SessionStore } from '@src/auth/session-store';

// export const ProfilePage = () => {
//   const session = useSolution<SessionStore>(SESSION_STORE);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     session.signOut();
//     navigate('/');
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Вы авторизованы</h2>
//       <Button type="primary" danger onClick={handleLogout}>
//         Выйти
//       </Button>
//     </div>
//   );
// };

// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Menu, Button, Layout } from 'antd';
// import { useSolution } from 'react-solution';
// import { useNavigate } from 'react-router-dom';
// import { SESSION_STORE } from '@src/auth/session-store/token';
// import { SessionStore } from '@src/auth/session-store';

// const { Header } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];

// const items: MenuItem[] = [
//   {
//     key: 'sub1',
//     label: 'Navigation One',
//     icon: <MailOutlined />,
//     children: [
//       { key: '1', label: 'Option 1' },
//       { key: '2', label: 'Option 2' },
//     ],
//   },
//   {
//     key: 'sub2',
//     label: 'Navigation Two',
//     icon: <AppstoreOutlined />,
//     children: [
//       { key: '3', label: 'Option 3' },
//       { key: '4', label: 'Option 4' },
//     ],
//   },
//   {
//     key: 'sub3',
//     label: 'Navigation Three',
//     icon: <SettingOutlined />,
//     children: [
//       { key: '5', label: 'Option 5' },
//       { key: '6', label: 'Option 6' },
//     ],
//   },
// ];

// export const AntDMenu = () => {
//   const onClick: MenuProps['onClick'] = (e) => {
//     console.log('click ', e);
//   };

//   const session = useSolution<SessionStore>(SESSION_STORE);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     session.signOut();
//     navigate('/');
//   };

//   return (
//     <Layout>
//       <Header style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         background: '#fff',
//         padding: '0 24px',
//         boxShadow: '0 2px 8px #f0f1f2'
//       }}>
//         <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Админка</div>
//         <Button type="primary" danger onClick={handleLogout}>
//           Выйти
//         </Button>
//       </Header>
//       <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
//         <Menu
//           onClick={onClick}
//           style={{ width: 256 }}
//           defaultSelectedKeys={['1']}
//           defaultOpenKeys={['sub1']}
//           mode="inline"
//           items={items}
//         />
//         <div>
//           <h2>Поле</h2>
//         </div>
//       </div>
//     </Layout>
//   );
// };