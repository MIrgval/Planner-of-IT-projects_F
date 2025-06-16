import React, { useEffect, useState } from 'react';
import { Modal, List, Tag, message } from 'antd';

interface TagListModalProps {
  visible: boolean;
  onClose: () => void;
}

export const TagListModal: React.FC<TagListModalProps> = ({ visible, onClose }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (visible) {
      // 📡 Запрос тегов
      /*
      fetch('/api/tags')
        .then(res => res.json())
        .then(data => setTags(data))
        .catch(console.error);
      */

      // 🧪 Пример
      setTags(['frontend', 'backend', 'design', 'devops']);
      setSelectedTags([]); // сбрасываем при открытии
    }
  }, [visible]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      message.info(`Тег "${tag}" уже добавлен`);
      return;
    }
    setSelectedTags([...selectedTags, tag]);
    console.log('Добавлен тег:', tag);
  };

  return (
    <Modal
      title="Список тегов"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
    >
      <List
        dataSource={tags}
        renderItem={(tag) => (
          <List.Item>
            <Tag
              color={selectedTags.includes(tag) ? 'green' : 'blue'}
              style={{ cursor: 'pointer' }}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Tag>
          </List.Item>
        )}
      />
    </Modal>
  );
};
