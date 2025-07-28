import { Button } from 'antd';
import { useSolution } from 'react-solution';
import { useNavigate } from 'react-router-dom';
import { SESSION_STORE } from '@src/auth/session-store/token';
import { SessionStore } from '@src/auth/session-store';

export const ProfilePage = () => {
  const session = useSolution<SessionStore>(SESSION_STORE);
  const navigate = useNavigate();

  const handleLogout = () => {
    session.signOut();
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Вы авторизованы</h2>
      <Button type="primary" danger onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );
};