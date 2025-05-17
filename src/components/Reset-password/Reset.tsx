import React from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import styles from './Reset.module.css';

const { Title, Text } = Typography;

type ResetPasswordProps = {
  visible: boolean;
  onCancel: () => void;
  onSend: (email: string) => void;
};

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  visible,
  onCancel,
  onSend,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { email: string }) => {
    onSend(values.email);
  };

  return (
    <Modal
      open={visible}
      title={<Title level={4} className={styles.title}>Восстановление пароля</Title>}
      footer={null}
      onCancel={onCancel}
      centered
      width={500}
      className={styles.modal}
    >
      <Text>Введите ваш e-mail, и мы вышлем ссылку для сброса пароля.</Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className={styles.form}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Введите e-mail' },
            { type: 'email', message: 'Неверный формат' },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="example@domain.com"
            size="large"
            className={styles.input}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
