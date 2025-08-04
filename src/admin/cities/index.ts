import { State } from 'react-solution';
import type { HttpClient } from 'react-solution';
import { CitiesState } from './types';

export class CitiesStore {
  state = new State<CitiesState>({
    list: [],
    filteredList: [],
    waiting: false,
    searchQuery: '',
    currentCountryFilter: null,
    total: 0
  });

  constructor(private depends: { httpClient: HttpClient }) {}

  async load(params: {
    searchQuery?: string;
    countryId?: string;
    limit?: number;
    skip?: number;
  } = {}) {
    this.state.set({ ...this.state.get(), waiting: true });

    try {
      const query = new URLSearchParams();
      
      if (params.searchQuery) {
        query.append('search[query]', params.searchQuery);
      }
      
      if (params.countryId) {
        query.append('search[country]', params.countryId);
      }

      const response = await this.depends.httpClient.request({
        url: `/api/v1/cities?${query.toString()}&limit=${params.limit || 20}&skip=${params.skip || 0}&fields=items(_id,title,country,population),count`
      });

      this.state.set({
        list: response.data.result.items,
        filteredList: response.data.result.items,
        waiting: false,
        searchQuery: params.searchQuery || '',
        currentCountryFilter: params.countryId || null,
        total: response.data.result.count
      });
      
      return true;
    } catch (error) {
      this.state.set({ 
        ...this.state.get(),
        waiting: false,
        list: [],
        filteredList: [],
        currentCountryFilter: null,
        total: 0
      });
      console.error('Ошибка загрузки:', error);
      return false;
    }
  }
}