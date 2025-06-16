import React, { useEffect, useState } from 'react';
import { Modal, List, Button, Typography, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Task {
  id: string;
  name: string;
}

interface DeleteTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

export const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ visible, onClose }) => {
  const [projectName, setProjectName] = useState('My Project');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (visible) {
      // 📡 Получение задач с бэка
      /*
      fetch('/api/project/tasks')
        .then(res => res.json())
        .then(data => {
          setProjectName(data.projectName);
          setTasks(data.tasks); // [{ id, name }]
        })
        .catch(console.error);
      */

      // 🧪 Пример
      setProjectName('Demo Project');
      setTasks([
        { id: '1', name: 'Сделать верстку' },
        { id: '2', name: 'Настроить CI/CD' },
        { id: '3', name: 'Написать тесты' },
      ]);
    }
  }, [visible]);

  const handleDelete = (id: string) => {
    // 📤 Запрос на удаление
    /*
    fetch('/api/tasks/' + id, { method: 'DELETE' })
      .then(() => setTasks(prev => prev.filter(t => t.id !== id)))
      .catch(() => message.error('Ошибка удаления'));
    */

    setTasks(prev => prev.filter(t => t.id !== id)); // mock
    message.success('Задача удалена');
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      title={`Удалить задачи из проекта: ${projectName}`}
      centered
    >
      <List
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Popconfirm title="Удалить задачу?" onConfirm={() => handleDelete(task.id)}>
                <Button danger icon={<DeleteOutlined />} />
              </Popconfirm>
            ]}
          >
            <Typography.Text>{task.name}</Typography.Text>
          </List.Item>
        )}
      />
    </Modal>
  );
};
