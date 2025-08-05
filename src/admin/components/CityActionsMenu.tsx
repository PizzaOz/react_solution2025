import { Button, Dropdown, MenuProps, Popconfirm, message } from 'antd';
import { DownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface CityActionsMenuProps {
  city: any;
  onEdit: () => void;
  onDelete: () => Promise<void>;
}

export const CityActionsMenu = ({
  city,
  onEdit,
  onDelete
}: CityActionsMenuProps) => {
  const handleDelete = async () => {
    try {
      await onDelete();
    } catch (error) {
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: 'Редактировать',
      icon: <EditOutlined />,
      onClick: onEdit
    },
    {
      key: 'delete',
      label: (
        <Popconfirm
          title="Удалить город?"
          onConfirm={handleDelete}
          okText="Да"
          cancelText="Нет"
        >
          <span style={{ color: 'red' }}>
            <DeleteOutlined /> Удалить
          </span>
        </Popconfirm>
      )
    }
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button type="link" icon={<DownOutlined />}>
        Действия
      </Button>
    </Dropdown>
  );
};