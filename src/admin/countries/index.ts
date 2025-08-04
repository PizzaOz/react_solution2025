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
    const response = await this.depends.httpClient.request({
      url: '/api/v1/countries?limit=20&fields=_id,title'
    });
    this.state.set({
      list: response.data.result.items,
      waiting: false
    });
  }

  async init() {
    if (this.state.get().list.length === 0) {
      await this.load();
    }
  }
}