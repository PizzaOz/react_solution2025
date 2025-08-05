import { Table, Alert, Spin } from 'antd';
import { CityActionsMenu } from './CityActionsMenu';

export const CitiesTable = ({
  cities,
  countries,
  pagination,
  loading,
  total,
  searchQuery,
  onEdit,
  onDelete,
  onPageChange
}: {
  cities: any[];
  countries: any[];
  pagination: any;
  loading: boolean;
  total: number;
  searchQuery: string;
  onEdit: (city: any) => void;
  onDelete: (id: string) => void;
  onPageChange: (pagination: any) => void;
}) => {
  const columns = [
    {
      title: 'Город',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Страна',
      key: 'country',
      render: (_: unknown, city: any) => {
        const country = countries.find((c) => c._id === city.country._id);
        return country?.title || city.country._id;
      }
    },
    {
      title: 'Население',
      dataIndex: 'population',
      key: 'population',
      render: (pop: number | undefined) => pop?.toLocaleString() ?? '-'
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      render: (_: unknown, city: any) => (
        <CityActionsMenu 
          city={city} 
          onEdit={() => onEdit(city)} 
          onDelete={() => onDelete(city._id)} 
        />
      )
    }
  ];

  return (
    <Spin spinning={loading}>
      {searchQuery && cities.length === 0 && !loading && (
        <Alert 
          message={`Города по запросу "${searchQuery}" не найдены`} 
          type="info" 
          showIcon
        />
      )}
      <Table
        columns={columns}
        dataSource={cities}
        rowKey="_id"
        pagination={{
          ...pagination,
          total,
          showSizeChanger: false
        }}
        onChange={onPageChange}
        loading={loading}
      />
    </Spin>
  );
};