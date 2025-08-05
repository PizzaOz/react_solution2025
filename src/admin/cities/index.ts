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

  async create(cityData: {
    title: string;
    country: { _id: string; _type: string };
    population?: number;
  }) {
    this.state.set({ ...this.state.get(), waiting: true });
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await this.depends.httpClient.request({
        method: 'POST',
        url: '/api/v1/cities',
        headers: {
          'X-Token': token
        },
        data: {
          title: cityData.title,
          country: {
            _id: cityData.country._id,
            _type: cityData.country._type
          },
          population: cityData.population || 0,
          description: "",
          location: [],
          location2: []
        }
      });
      
      return true;
    } catch (error: any) {
      console.error('Ошибка создания города:', error);
      
      if (error.response?.status === 403) {
        throw new Error('Недостаточно прав для создания города');
      } else {
        throw new Error('Ошибка при создании города');
      }
    } finally {
      this.state.set({ ...this.state.get(), waiting: false });
    }
  }

  async deleteCity(id: string) {
    this.state.set({ ...this.state.get(), waiting: true });
    
    try {
      const token = localStorage.getItem('token');
      await this.depends.httpClient.request({
        method: 'DELETE',
        url: `/api/v1/cities/${id}`,
        headers: {
          'X-Token': token
        }
      });
      return true;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Недостаточно прав для удаления города');
      }
      throw new Error('Ошибка при удалении города');
    } finally {
      this.state.set({ ...this.state.get(), waiting: false });
    }
  }

  async updateCity(
    id: string,
    cityData: {
      title: string;
      country: { _id: string; _type: string };
      population?: number;
    }
  ) {
    this.state.set({ ...this.state.get(), waiting: true });
    
    try {
      const token = localStorage.getItem('token');
      await this.depends.httpClient.request({
        method: 'PUT',
        url: `/api/v1/cities/${id}`,
        headers: {
          'X-Token': token
        },
        data: {
          title: cityData.title,
          country: {
            _id: cityData.country._id,
            _type: cityData.country._type
          },
          population: cityData.population || 0,
          description: "",
          location: [],
          location2: []
        }
      });
      return true;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Недостаточно прав для редактирования города');
      }
      throw new Error('Ошибка при обновлении города');
    } finally {
      this.state.set({ ...this.state.get(), waiting: false });
    }
  }
}