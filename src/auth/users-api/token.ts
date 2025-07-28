import { newToken } from 'react-solution';
import { UsersApi } from './index';

export const USERS_API = newToken<UsersApi>('UsersApi');