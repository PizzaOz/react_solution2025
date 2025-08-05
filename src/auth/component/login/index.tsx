import { useSolution } from 'react-solution';
import { Button, Form, Input, Alert } from 'antd'; // Добавляем Alert
import { SESSION_STORE } from '../../session-store/token';
import { SessionStore } from '../../session-store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Добавляем useState

interface FormValues {
  username: string;
  password: string;
}

interface FormsProps {
  returnUrl?: string;
}

const Forms = ({ returnUrl = '/profile' }: FormsProps) => {
  const session = useSolution<SessionStore>(SESSION_STORE);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null); // Состояние для ошибки
  const [loading, setLoading] = useState(false); // Состояние для загрузки

  const onFinish = async (values: FormValues) => {
    try {
      setError(null); // Сбрасываем ошибку перед запросом
      setLoading(true);
      await session.signIn({
        login: values.username,
        password: values.password
      });
      navigate(returnUrl);
    } catch (error) {
      setError('Неверный логин или пароль'); // Устанавливаем текст ошибки
      console.error('Ошибка авторизации:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<FormValues> onFinish={onFinish}>
      {/* Блок для отображения ошибки */}
      {error && (
        <Form.Item>
          <Alert 
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
          />
        </Form.Item>
      )}

      <Form.Item name="username" rules={[{ required: true, message: 'Пожалуйста, введите логин' }]}>
        <Input 
          placeholder="Логин"
          autoComplete="username"
          id="username-input"
        />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}>
        <Input.Password 
          placeholder="Пароль"
          autoComplete="current-password"
          id="password-input"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Forms;