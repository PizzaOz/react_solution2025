import { classProvider } from 'react-solution';
import { SessionStore } from './index';
import { SESSION_STORE } from './token';
import { USERS_API } from '../users-api/token';

export const sessionStore = classProvider({
  token: SESSION_STORE,
  constructor: SessionStore,
  depends: { 
    usersApi: USERS_API 
  }
});