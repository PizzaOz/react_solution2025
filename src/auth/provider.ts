import { sessionStore } from './session-store/provider';
import { usersApi } from './users-api/providers';


export const authFeature = [usersApi, sessionStore];