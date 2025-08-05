import { useSolution } from 'react-solution';
import { useEffect, useState } from 'react';
import { CITIES_STORE } from '../cities/token';
import { COUNTRIES_STORE } from '../countries/tokens';
import { CitiesFilters } from './CitiesFilters';
import { CitiesTable } from './CitiesTable';
import { CityEditModal } from './CityEditModal';

export const CitiesList = () => {
  const citiesStore = useSolution(CITIES_STORE);
  const countriesStore = useSolution(COUNTRIES_STORE);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCity, setEditingCity] = useState<{id: string, data: any} | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  });

  const { filteredList, waiting, total } = citiesStore.state.get();
  const { list: countries } = countriesStore.state.get();

  const loadData = async (page = 1) => {
    const success = await citiesStore.load({
      searchQuery: searchInput,
      countryId: selectedCountry || undefined,
      limit: pagination.pageSize,
      skip: (page - 1) * pagination.pageSize
    });
    
    if (success) {
      setPagination({
        ...pagination,
        current: page,
        total: citiesStore.state.get().total
      });
    }
  };

  useEffect(() => {
    const init = async () => {
      await countriesStore.load();
      await loadData();
    };
    init();
  }, []);

  const handleSearch = () => loadData(1);
  const handleReset = () => {
    setSearchInput('');
    setSelectedCountry(null);
    loadData(1);
  };
  const handleCountryChange = (countryId: string) => {
    setSelectedCountry(countryId);
    loadData(1);
  };
  const handleTableChange = (newPagination: any) => loadData(newPagination.current);

  const showAddModal = () => {
    setEditingCity(null);
    setIsModalVisible(true);
  };

  const showEditModal = (city: any) => {
    setEditingCity({
      id: city._id,
      data: city
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    const success = await citiesStore.deleteCity(id);
    if (success) {
      loadData(pagination.current);
    }
  };

  const handleModalSubmit = async (values: any) => {
    const cityData = {
      title: values.title,
      country: {
        _id: values.country,
        _type: 'ref'
      },
      population: values.population
    };

    let success;
    if (editingCity) {
      success = await citiesStore.updateCity(editingCity.id, cityData);
    } else {
      success = await citiesStore.create(cityData);
    }

    if (success) {
      setIsModalVisible(false);
      loadData(pagination.current);
    }
  };

  return (
    <>
      <CitiesFilters
        searchInput={searchInput}
        selectedCountry={selectedCountry}
        countries={countries}
        onSearchInputChange={setSearchInput}
        onSearch={handleSearch}
        onReset={handleReset}
        onCountryChange={handleCountryChange}
        onAddCity={showAddModal}
      />

      <CitiesTable
        cities={filteredList}
        countries={countries}
        pagination={pagination}
        loading={waiting}
        total={total}
        searchQuery={citiesStore.state.get().searchQuery}
        onEdit={showEditModal}
        onDelete={handleDelete}
        onPageChange={handleTableChange}
      />

      <CityEditModal
        visible={isModalVisible}
        editingCity={editingCity}
        countries={countries}
        loading={waiting}
        onSubmit={handleModalSubmit}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  );
};
