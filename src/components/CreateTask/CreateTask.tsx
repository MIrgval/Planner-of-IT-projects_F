import React, { useState } from 'react';
import { Modal, Form, Input, Button, Typography, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import styles from './CreateTask.module.css'; // создайте стиль если нужно
import TextArea from 'antd/es/input/TextArea';


const { Title } = Typography;

type CreateTaskProps = {
  visible: boolean;
  onCancel: () => void;
};

const statusOptions = [
  { label: 'Открыто', value: 'open' },
  { label: 'В процессе', value: 'in_progress' },
  { label: 'Завершено', value: 'completed' },
];

const tagOptions = [
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Design', value: 'design' },
];

export const CreateTask: React.FC<CreateTaskProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleFinish = (values: any) => {
    // Обработка отправки формы
    console.log('Задача:', values);
    // form.resetFields(); // если хотите сброс после отправки
    // onCancel(); // если нужно закрывать окно
  };

  return (
    <Modal
      open={visible}
      title={<Title level={4} className={styles.title}>Создание задачи</Title>}
      footer={null}
      onCancel={onCancel}
      centered
      className={styles.modal}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: 'open',
          dueDate: null,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: 'Введите название задачи' }]}
        >
          <Input placeholder="Название задачи" size="large" />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: 'Введите описание задачи' }]}
        >
          <TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
        </Form.Item>

        <Form.Item
          label="Время выполнения"
          name="dueDate"
          rules={[{ required: true, message: 'Укажите дату и время выполнения' }]}
        >
          <DatePicker
            showTime
            format="DD.MM.YYYY HH:mm"
            placeholder="01.01.2025 12:00"
            style={{ width: '100%' }}
            size="large"
            disabledDate={current => current && current < dayjs().startOf('day')}
          />
        </Form.Item>

        <Form.Item
          label="Статус"
          name="status"
          rules={[{ required: true, message: 'Выберите статус' }]}
        >
          <Select
            placeholder="Выберите статус"
            options={statusOptions}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Теги"
          name="tags"
          rules={[{ required: true, message: 'Выберите хотя бы один тег' }]}
          style={{ marginBottom: '2rem' }}
        >
          <Select
            mode="multiple"
            placeholder="Выберите теги"
            options={tagOptions}
            style={{ width: '100%' }}
            value={selectedTags}
            onChange={setSelectedTags}
            showSearch={false}
            onInputKeyDown={e => e.preventDefault()}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className={styles.loginButton}
          >
            Создать задачу
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
