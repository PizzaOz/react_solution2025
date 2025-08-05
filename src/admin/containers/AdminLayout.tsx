import { EnvironmentOutlined } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { useSolution } from 'react-solution';
import { useNavigate } from 'react-router-dom';
import { SESSION_STORE } from '@src/auth/session-store/token';
import { SessionStore } from '@src/auth/session-store';
import CitiesList from './CitiesList';

const { Header } = Layout;

export const AdminLayout = () => {
  const session = useSolution<SessionStore>(SESSION_STORE);
  const navigate = useNavigate();

  const handleLogout = () => {
    session.signOut();
    navigate('/');
  };

  return (
    <Layout>
      <Header style={headerStyle}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Админка</div>
        <Button type="primary" danger onClick={handleLogout}>
          Выйти
        </Button>
      </Header>
      <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
        <Menu
          style={{ width: 256 }}
          selectedKeys={['cities']}
          mode="inline"
          items={[
            {
              key: 'cities',
              label: 'Города',
              icon: <EnvironmentOutlined />
            }
          ]}
        />
        <div style={{ flex: 1 }}>
          <CitiesList />
        </div>
      </div>
    </Layout>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#fff',
  padding: '0 24px',
  boxShadow: '0 2px 8px #f0f1f2'
};