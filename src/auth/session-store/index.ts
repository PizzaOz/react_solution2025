import { State } from 'react-solution';
import { UsersApi } from '../users-api';

interface SessionState {
  token: string | null;
  waiting: boolean;
}

export class SessionStore {
  state = new State<SessionState>({
    token: null,
    waiting: false
  });

  constructor(private depends: { usersApi: UsersApi }) {
    this.usersApi = depends.usersApi;
  }
  private usersApi: UsersApi;

  async signIn(data: { login: string; password: string }) {
    this.state.set({ ...this.state.get(), waiting: true });
    try {
      const result = await this.usersApi.signIn(data);
      localStorage.setItem('token', result.token);
      this.state.set({ token: result.token, waiting: false });
      console.log('Авторизован! Токен:', result.token);
    } catch (error) {
      this.state.set({ 
        ...this.state.get(),
        waiting: false
      });
      throw error;
    }
  }

  async remind() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await this.usersApi.checkToken(token);
        this.state.set({ token, waiting: false });
        console.log('Сессия восстановлена');
        return true;
      } catch {
        localStorage.removeItem('token');
        return false;
      }
    }
    return false;
  }

  signOut() {
    localStorage.removeItem('token');
    this.state.set({ token: null, waiting: false });
    console.log('Сессия завершена');
  }
}