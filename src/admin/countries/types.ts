export interface Country {
    _id: string;
    title: string;
  }
  
  export interface CountriesState {
    list: Country[];
    waiting: boolean;
  }
  
  export type CountriesStateUpdate = Partial<CountriesState>;