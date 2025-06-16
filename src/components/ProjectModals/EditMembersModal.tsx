import React, { useEffect, useState } from 'react';
import {
  Modal,
  List,
  Button,
  Avatar,
  Popconfirm,
  message,
  Select,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface EditMembersModalProps {
  visible: boolean;
  onClose: () => void;
}

interface ProjectMember {
  id: string;
  name: string;
  tag?: string;
}

export const EditMembersModal: React.FC<EditMembersModalProps> = ({
  visible,
  onClose,
}) => {
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (visible) {
      // 📡 Загрузка участников проекта
      /*
      fetch('/api/project/members')
        .then(res => res.json())
        .then(data => setMembers(data))
        .catch(console.error);
      */

      // 📡 Загрузка доступных тегов проекта
      /*
      fetch('/api/project/tags')
        .then(res => res.json())
        .then(data => setTags(data))
        .catch(console.error);
      */

      // 🧪 Моковые данные
      setMembers([
        { id: '1', name: 'Анна Петрова', tag: 'frontend' },
        { id: '2', name: 'Егор Смирнов', tag: 'backend' },
      ]);
      setTags(['frontend', 'backend', 'design', 'QA']);
    }
  }, [visible]);

  const handleTagChange = (id: string, tag: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, tag } : m))
    );
    console.log(`Назначен тег "${tag}" участнику ${id}`);
  };

  const removeMember = (id: string) => {
    // 📤 Удаление участника
    /*
    fetch('/api/project/members/' + id, { method: 'DELETE' })
      .then(() => setMembers(prev => prev.filter(m => m.id !== id)))
      .catch(() => message.error('Ошибка удаления'));
    */
    setMembers((prev) => prev.filter((m) => m.id !== id));
    message.success('Участник удалён');
  };

  return (
    <Modal
      title="Редактировать участников"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <List
        dataSource={members}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Select
                value={user.tag}
                onChange={(value) => handleTagChange(user.id, value)}
                style={{ width: 120 }}
              >
                {tags.map((tag) => (
                  <Select.Option key={tag} value={tag}>
                    {tag}
                  </Select.Option>
                ))}
              </Select>,
              <Popconfirm
                title="Удалить участника?"
                onConfirm={() => removeMember(user.id)}
              >
                <Button danger icon={<DeleteOutlined />} />
              </Popconfirm>,
            ]}
          >
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
