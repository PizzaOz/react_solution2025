import { State } from 'react-solution';
import type { HttpClient } from 'react-solution';
import { CountriesState } from './types';

export class CountriesStore {
  state = new State<CountriesState>({
    list: [],
    waiting: false
  });

  constructor(private depends: { httpClient: HttpClient }) {}

  async load() {
    this.state.set({ ...this.state.get(), waiting: true });

    try {
      const response = await this.depends.httpClient.request({
        url: '/api/v1/countries?limit=1000&fields=items(_id,title)'
      });

      this.state.set({
        list: response.data.result.items,
        waiting: false
      });
      
      return true;
    } catch (error) {
      this.state.set({ 
        ...this.state.get(),
        waiting: false
      });
      console.error('Ошибка загрузки стран:', error);
      return false;
    }
  }
}