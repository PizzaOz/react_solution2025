import { State } from 'react-solution';
import type { HttpClient } from 'react-solution';
import { CitiesState } from './types';

export class CitiesStore {
  state = new State<CitiesState>({
    list: [],
    filteredList: [],
    waiting: false,
    searchQuery: ''
  });

  constructor(private depends: { httpClient: HttpClient }) {}

  async load() {
    this.state.set({ ...this.state.get(), waiting: true });
    try {
      const response = await this.depends.httpClient.request({
        url: '/api/v1/cities?limit=1000&fields=_id,title,country,population'
      });
      
      const cities = response.data.result.items;
      this.state.set({
        list: cities,
        filteredList: cities,
        waiting: false,
        searchQuery: ''
      });
    } catch (error) {
      this.state.set({ ...this.state.get(), waiting: false });
      throw error;
    }
  }

  search(query: string) {
    const currentState = this.state.get();
    const normalizedQuery = query.trim().toLowerCase();
    
    if (!normalizedQuery) {
      this.state.set({
        ...currentState,
        filteredList: currentState.list,
        searchQuery: ''
      });
      return;
    }

    const filtered = currentState.list.filter(city => 
      city.title.toLowerCase().includes(normalizedQuery)
    );

    this.state.set({
      ...currentState,
      filteredList: filtered,
      searchQuery: query
    });
  }

  async init() {
    if (this.state.get().list.length === 0) {
      await this.load();
    }
  }
}