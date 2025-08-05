import { Input, Select, Button, Space } from 'antd';

export const CitiesFilters = ({
  searchInput,
  selectedCountry,
  countries,
  onSearchInputChange,
  onSearch,
  onReset,
  onCountryChange,
  onAddCity
}: {
  searchInput: string;
  selectedCountry: string | null;
  countries: any[];
  onSearchInputChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  onCountryChange: (countryId: string) => void;
  onAddCity: () => void;
}) => (
  <Space>
    <Input
      placeholder="Поиск по городу"
      value={searchInput}
      onChange={(e) => onSearchInputChange(e.target.value)}
      onPressEnter={onSearch}
      style={{ width: 200 }}
    />
    <Select
      placeholder="Выберите страну"
      value={selectedCountry}
      onChange={onCountryChange}
      style={{ width: 200 }}
      allowClear
    >
      {countries.map((country) => (
        <Select.Option key={country._id} value={country._id}>
          {country.title}
        </Select.Option>
      ))}
    </Select>
    <Button type="primary" onClick={onSearch}>
      Поиск
    </Button>
    <Button onClick={onReset}>
      Сбросить
    </Button>
    <Button type="primary" onClick={onAddCity}>
      Добавить город
    </Button>
  </Space>
);