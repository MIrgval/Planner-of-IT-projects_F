import React, { useEffect, useState } from 'react';
import { Modal, List, Button, Avatar } from 'antd';

interface AddMemberModalProps {
  visible: boolean;
  onClose: () => void;
}

interface GroupUser {
  id: string;
  name: string;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ visible, onClose }) => {
  const [users, setUsers] = useState<GroupUser[]>([]);

  useEffect(() => {
    if (visible) {
      // 📡 Запрос списка пользователей группы
      /*
      fetch('/api/group/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(console.error);
      */

      // 🧪 Пример
      setUsers([
        { id: '1', name: 'Иван И.' },
        { id: '2', name: 'Мария С.' },
        { id: '3', name: 'Дмитрий К.' }
      ]);
    }
  }, [visible]);

  return (
    <Modal
      title="Добавить участника"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <List
        dataSource={users}
        renderItem={(user) => (
          <List.Item actions={[<Button type="primary">Добавить</Button>]}>
            <List.Item.Meta
              avatar={<Avatar>{user.name[0]}</Avatar>}
              title={user.name}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};
