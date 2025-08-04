import { Table, Input, Button, Space, Alert, Spin, Select, Modal, Form } from 'antd';
import { useSolution } from 'react-solution';
import { useEffect, useState } from 'react';
import { CITIES_STORE } from '../cities/token';
import { COUNTRIES_STORE } from '../countries/tokens';

const { Option } = Select;

export const CitiesList = () => {
  const [form] = Form.useForm();
  const citiesStore = useSolution(CITIES_STORE);
  const countriesStore = useSolution(COUNTRIES_STORE);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  const loadData = async (page = 1) => {
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();

      const success = await citiesStore.create({
        title: values.title,
        country: {
          _id: values.country,
          _type: 'ref',
        },
        population: values.population,
      });

      if (success) {
        setIsModalVisible(false);
        form.resetFields();
        loadData(pagination.current);
      }
    } catch (error) {
      console.error('Ошибка валидации:', error);
    }
  };

  const { filteredList, searchQuery, waiting } = citiesStore.state.get();
  const { list: countries } = countriesStore.state.get();

  return (
    <Spin spinning={waiting}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Input
            placeholder="Поиск по городу"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: 200 }}
          />
          <Select
            placeholder="Выберите страну"
            value={selectedCountry}
            onChange={handleCountryChange}
            style={{ width: 200 }}
            allowClear
          >
            {countries.map(country => (
              <Option key={country._id} value={country._id}>
                {country.title}
              </Option>
            ))}
          </Select>
          <Button type="primary" onClick={handleSearch}>
            Поиск
          </Button>
          <Button onClick={handleReset}>Сбросить</Button>
          <Button type="primary" onClick={showModal}>
            Добавить город
          </Button>
        </Space>

        {searchQuery && filteredList.length === 0 && !waiting && (
          <Alert message={`Города по запросу "${searchQuery}" не найдены`} type="info" showIcon />
        )}

        <Table
          columns={[
            {
              title: 'Город',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: 'Страна',
              key: 'country',
              render: (_, city) => {
                const country = countries.find(c => c._id === city.country._id);
                return country?.title || city.country._id;
              },
            },
            {
              title: 'Население',
              dataIndex: 'population',
              key: 'population',
              render: pop => pop?.toLocaleString() ?? '-',
            },
          ]}
          dataSource={filteredList}
          rowKey="_id"
          pagination={pagination}
          onChange={handleTableChange}
          loading={waiting}
        />

        <Modal
          title="Добавить новый город"
          open={isModalVisible}
          onOk={handleCreate}
          onCancel={handleCancel}
          confirmLoading={waiting}
          okText="Создать"
          cancelText="Отмена"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="Название города"
              rules={[{ required: true, message: 'Пожалуйста, введите название города' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="country"
              label="Страна"
              rules={[{ required: true, message: 'Пожалуйста, выберите страну' }]}
            >
              <Select placeholder="Выберите страну">
                {countries.map(country => (
                  <Option key={country._id} value={country._id}>
                    {country.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="population"
              label="Население"
              rules={[
                {
                  transform: value => (value ? Number(value) : undefined),
                  type: 'number',
                  min: 0,
                  message: 'Введите положительное число',
                },
              ]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </Spin>
  );
};
