export interface City {
  _id: string;
  title: string;
  country: {
    _id: string;
    _type: string;
  };
  population?: number;
  location?: [number, number];
}

export interface CitiesState {
  list: City[];
  filteredList: City[];
  waiting: boolean;
  searchQuery: string;
}

export type CitiesStateUpdate = Partial<CitiesState>;