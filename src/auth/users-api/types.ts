export interface SignInResult {
    token: string;
    user: {
      _id: string;
      email: string;
    };
  }
  
  export interface CheckTokenResult {
    _id: string;
    email: string;
  }