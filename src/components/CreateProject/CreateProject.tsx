import React, { useMemo, useState } from 'react';
import { Modal, Form, Input, Button, Typography, DatePicker, Row, Col, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import styles from './CreateProject.module.css';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

type CreateProjectProps = {
  visible: boolean;
  onCancel: () => void;
};

export const CreateProject: React.FC<CreateProjectProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  // Сегодняшняя дата
  const today = useMemo(() => dayjs(), []);

  // Следим за выбранной датой начала
  const startDate: Dayjs | null = Form.useWatch('startDate', form);

  // Блокируем в «дате окончания» всё раньше startDate
  const disabledEndDate = (current: Dayjs) => {
    return startDate ? current.isBefore(startDate, 'day') : false;
  };

  const handleFinish = (values: any) => {
    console.log('Submitted values:', values);
  };

  const tagOptions = [
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Design', value: 'design' },
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <Modal
      open={visible}
      title={<Title level={4} className={styles.title}>Создание проекта</Title>}
      footer={null}
      onCancel={onCancel}
      centered
      className={styles.modal}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          startDate: today,
          endDate: null,
        }}
        onFinish={handleFinish}
      >
        {/* Название проекта */}
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: 'Введите название проекта' }]}
        >
          <Input placeholder="Название проекта" size="large" />
        </Form.Item>

        {/* Даты начала и окончания */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Дата начала проекта"
              name="startDate"
              rules={[{ required: true, message: 'Укажите дату начала' }]}
            >
              <DatePicker
                format="DD.MM.YYYY"
                placeholder="01.01.1900"
                style={{ width: '100%' }}
                size="large"
                allowClear={false}
                disabledDate={(current) =>
                  current.isBefore(dayjs().startOf('day'))
                }
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Дата окончания проекта"
              name="endDate"
              rules={[
                { required: true, message: 'Укажите дату окончания' },
                ({ getFieldValue }) => ({
                  validator(_, value: Dayjs) {
                    const start: Dayjs = getFieldValue('startDate');
                    if (value && start && value.isBefore(start, 'day')) {
                      return Promise.reject(new Error('Дата окончания не может быть раньше даты начала'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <DatePicker
                format="DD.MM.YYYY"
                placeholder="01.01.1900"
                style={{ width: '100%' }}
                size="large"
                allowClear={false}
                disabledDate={disabledEndDate}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Описание */}
        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: 'Введите описание проекта' }]}
        >
          <TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
        </Form.Item>

        <Form.Item
          label="Теги"
          name="tags"
          rules={[{ required: true, message: 'Выберите хотя бы один тег' }]}
          style={{ marginBottom: '2.5rem' }}
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

        {/* Кнопка отправки */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className={styles.loginButton}
          >
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
