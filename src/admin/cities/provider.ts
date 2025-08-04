import { classProvider } from 'react-solution';
import { CitiesStore } from './index';
import { HTTP_CLIENT } from 'react-solution';
import { CITIES_STORE } from './token';

export const citiesProvider = classProvider({
  token: CITIES_STORE,
  constructor: CitiesStore,
  depends: { 
    httpClient: HTTP_CLIENT 
  }
});