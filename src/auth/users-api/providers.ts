import { classProvider } from 'react-solution';
import { UsersApi } from './index';
import { USERS_API } from './token';
import { HTTP_CLIENT } from 'react-solution';

export const usersApi = classProvider({
  token: USERS_API,
  constructor: UsersApi,
  depends: { 
    httpClient: HTTP_CLIENT,
  }
});