import { Modal, Form, Input, Select } from 'antd';

export const CityEditModal = ({
  visible,
  editingCity,
  countries,
  loading,
  onSubmit,
  onCancel
}: {
  visible: boolean;
  editingCity: {id: string, data: any} | null;
  countries: any[];
  loading: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={editingCity ? 'Редактировать город' : 'Добавить новый город'}
      open={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
      confirmLoading={loading}
      okText={editingCity ? 'Сохранить' : 'Добавить'}
      cancelText="Отмена"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: editingCity?.data.title,
          country: editingCity?.data.country._id,
          population: editingCity?.data.population
        }}
        onFinish={onSubmit}
      >
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
            {countries.map((country) => (
              <Select.Option key={country._id} value={country._id}>
                {country.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="population"
          label="Население"
          rules={[
            { 
              transform: (value: any) => value ? Number(value) : undefined,
              type: 'number',
              min: 0,
              message: 'Введите положительное число'
            }
          ]}
        >
          <Input type="number" min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};