import { Table, Tag, Input, Button, Space, Alert } from 'antd';
import { useSolution } from 'react-solution';
import { useEffect, useState } from 'react';
import type { City } from '../cities/types';
import { CITIES_STORE } from '../cities/token';
import { COUNTRIES_STORE } from '../countries/tokens';

export const CitiesList = () => {
  const citiesStore = useSolution(CITIES_STORE);
  const countriesStore = useSolution(COUNTRIES_STORE);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        countriesStore.load(),
        citiesStore.init()
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSearch = () => {
    if (searchInput.trim()) {
      citiesStore.search(searchInput);
      setSearchPerformed(true);
    } else {
      citiesStore.search('');
      setSearchPerformed(false);
    }
  };

  const handleReset = () => {
    setSearchInput('');
    citiesStore.search('');
    setSearchPerformed(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const columns = [
    {
      title: 'Город',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: City, b: City) => a.title.localeCompare(b.title)
    },
    {
      title: 'Страна',
      key: 'country',
      render: (_: unknown, city: City) => {
        const country = countriesStore.state.get().list.find(c => c._id === city.country._id);
        return country ? <Tag>{country.title}</Tag> : city.country._id;
      }
    },
    {
      title: 'Население',
      dataIndex: 'population',
      key: 'population',
      render: (pop?: number) => pop?.toLocaleString() ?? '-',
      sorter: (a: City, b: City) => (a.population || 0) - (b.population || 0)
    }
  ];

  const { filteredList, searchQuery } = citiesStore.state.get();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Input
          placeholder="Введите название города"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ width: 300 }}
          allowClear
        />
        <Button type="primary" onClick={handleSearch}>
          Поиск
        </Button>
        <Button onClick={handleReset}>
          Сбросить
        </Button>
      </Space>

      {searchPerformed && filteredList.length === 0 && (
        <Alert 
          message={`Города по запросу "${searchQuery}" не найдены`} 
          type="info" 
          showIcon
        />
      )}

      <Table
        loading={loading}
        dataSource={filteredList}
        columns={columns}
        rowKey="_id"
        size="small"
        bordered
        locale={{
          emptyText: searchPerformed 
            ? 'Нет результатов поиска' 
            : 'Нет данных для отображения'
        }}
      />
    </Space>
  );
};