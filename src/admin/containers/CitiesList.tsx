import { useSolution } from 'react-solution';
import { memo, useCallback, useEffect, useState } from 'react';
import { CITIES_STORE } from '../cities/token';
import { COUNTRIES_STORE } from '../countries/tokens';
import { CitiesFilters } from '../components/CitiesFilters';
import { CitiesTable } from '../components/CitiesTable';
import { CityEditModal } from '../components/CityEditModal';
import { message } from 'antd';

function CitiesList() {
  const citiesStore = useSolution(CITIES_STORE);
  const countriesStore = useSolution(COUNTRIES_STORE);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCity, setEditingCity] = useState<{ id: string; data: any } | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  const { filteredList, waiting, total } = citiesStore.state.get();
  const { list: countries } = countriesStore.state.get();

  // загрузка данных
  const loadData = useCallback(
    async (page = 1) => {
      const success = await citiesStore.load({
        searchQuery: searchInput,
        countryId: selectedCountry || undefined,
        limit: pagination.pageSize,
        skip: (page - 1) * pagination.pageSize,
      });

      if (success) {
        setPagination({
          ...pagination,
          current: page,
          total: citiesStore.state.get().total,
        });
      }
    },
    [searchInput, selectedCountry, pagination.pageSize, citiesStore]
  );

  // Сброс фильтров
  const handleReset = useCallback(() => {
    setSearchInput('');
    setSelectedCountry(null);
    citiesStore
      .load({
        searchQuery: '',
        countryId: undefined,
        limit: pagination.pageSize,
        skip: 0,
      })
      .then(() => {
        setPagination({
          current: 1,
          pageSize: 20,
          total: citiesStore.state.get().total,
        });
      });
  }, [citiesStore, pagination.pageSize]);

  // Поиск
  const handleSearch = useCallback(() => loadData(1), [loadData]);

  // Изменение страны
  const handleCountryChange = useCallback(
    (countryId: string) => {
      setSelectedCountry(countryId);
      loadData(1);
    },
    [loadData]
  );

  //  Пагинация таблицы
  const handleTableChange = useCallback(
    (newPagination: any) => loadData(newPagination.current),
    [loadData]
  );

  // Открытие модалки добавления города
  const showAddModal = useCallback(() => {
    setEditingCity(null);
    setIsModalVisible(true);
  }, []);

  // Открытие модалки редактирования города
  const showEditModal = useCallback((city: any) => {
    setEditingCity({
      id: city._id,
      data: city,
    });
    setIsModalVisible(true);
  }, []);

  // Удаление города
  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await citiesStore.deleteCity(id);
        message.success('Город успешно удалён');
        loadData(pagination.current);
      } catch (error: any) {
        message.error(error.message);
      }
    },
    [citiesStore, loadData, pagination.current],
  );

  // Отправка формы (создание/редактирование)
  const handleModalSubmit = useCallback(
    async (values: any) => {
      try {
        const cityData = {
          title: values.title,
          country: {
            _id: values.country,
            _type: 'ref',
          },
          population: values.population
        };
  
        if (editingCity) {
          await citiesStore.updateCity(editingCity.id, cityData);
          message.success('Город успешно обновлён');
        } else {
          await citiesStore.create(cityData);
          message.success('Город успешно создан');
        }
        
        setIsModalVisible(false);
        loadData(pagination.current);
      } catch (error: any) {
        message.error(error.message);
      }
    },
    [editingCity, citiesStore, loadData, pagination.current],
  );

  // Закрытие модалки
  const handleModalClose = useCallback(() => setIsModalVisible(false), []);

  // Инициализация данных
  useEffect(() => {
    const init = async () => {
      await countriesStore.load();
      await loadData();
    };
    init();
  }, [loadData, countriesStore]);

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
        onCancel={handleModalClose}
      />
    </>
  );
};

export default memo(CitiesList);