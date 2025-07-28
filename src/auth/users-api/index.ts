import { ApiBaseEndpoint } from 'react-solution';
import { SignInResult, CheckTokenResult } from './types';
import type { HttpClient } from 'react-solution';

export class UsersApi extends ApiBaseEndpoint {
  constructor(depends: { 
    httpClient: HttpClient,
  }) {
    super(depends);
  }

  async signIn(data: { login: string; password: string }): Promise<SignInResult> {
    const response = await this.request({
      method: 'POST',
      url: '/api/v1/users/sign',
      data
    });
    return response.data.result;
  }

  async checkToken(token: string): Promise<CheckTokenResult> {
    const response = await this.request({
      method: 'GET',
      url: '/api/v1/users/self',
      headers: { 'X-Token': token }
    });
    return response.data.result;
  }
}


