import { AdminLayout } from '@src/admin/components/AdminLayout';
import Forms from '@src/auth/component/login';
import Protected from '@src/auth/component/protected';
import { SessionStore } from '@src/auth/session-store';
import { SESSION_STORE } from '@src/auth/session-store/token';
import { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Head, ModalsContainer, useInit, useSolution } from 'react-solution';

export const App = memo(() => {
  const session = useSolution<SessionStore>(SESSION_STORE);
  
  useInit(() => {
    session.remind();
  });
  
  return (
    <>
      <Head>
        <html lang="ru" />
        <title>React Solution!</title>
        <meta name="description" content="React solution" />
      </Head>
      <Suspense fallback={<div>Подождите...</div>}>
        <Routes>
          <Route path="/" element={<Forms />} />
          <Route path="/profile" element={
            <Protected>
              <AdminLayout />
            </Protected>
          } />
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
        <ModalsContainer />
      </Suspense>
    </>
  );
});
