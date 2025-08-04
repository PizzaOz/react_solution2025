import { memo, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useExternalState, useSolution, useInit } from 'react-solution';
import { SESSION_STORE } from '@src/auth/session-store/token';
import Forms from '../login';


interface Props {
  children: ReactNode;
}

function Protected({ children }: Props) {
  const location = useLocation();
  const session = useSolution(SESSION_STORE);
  const { token, waiting } = useExternalState(session.state);

  useInit(async () => {
    await session.remind();
  });

  if (waiting) {
    return <div>Проверка авторизации...</div>;
  }

  if (!token) {
    return <Forms returnUrl={location.pathname} />;
  }

  return children;
}

export default memo(Protected);