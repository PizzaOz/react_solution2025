import { classProvider } from 'react-solution';
import { CountriesStore } from './index';

import { HTTP_CLIENT } from 'react-solution';
import { COUNTRIES_STORE } from './tokens';

export const countriesProvider = classProvider({
  token: COUNTRIES_STORE,
  constructor: CountriesStore,
  depends: { 
    httpClient: HTTP_CLIENT 
  }
});