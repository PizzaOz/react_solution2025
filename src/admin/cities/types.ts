export interface City {
  _id: string;
  title: string;
  country: {
    _id: string;
    _type: string;
  };
  population?: number;
}

export interface CitiesState {
  list: City[];
  filteredList: City[];
  waiting: boolean;
  searchQuery: string;
  currentCountryFilter: string | null;
  total: number;
}