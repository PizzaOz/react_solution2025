import { newToken } from 'react-solution';
import { CountriesStore } from './index';

export const COUNTRIES_STORE = newToken<CountriesStore>('CountriesStore');