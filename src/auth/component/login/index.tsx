import { useSolution } from 'react-solution';
import { Button, Form, Input } from 'antd';
import { SESSION_STORE } from '../../session-store/token';
import { SessionStore } from '../../session-store';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  username: string;
  password: string;
}

const Forms = () => {
  const session = useSolution<SessionStore>(SESSION_STORE);
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    await session.signIn({
      login: values.username,
      password: values.password
    });
    navigate('/profile');
  };

  return (
    <Form<FormValues> onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input 
          placeholder="Логин"
          autoComplete="username"
          id="username-input"
        />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password 
          placeholder="Пароль"
          autoComplete="current-password"
          id="password-input"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Forms;