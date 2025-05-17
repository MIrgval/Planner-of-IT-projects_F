import React from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Register.module.css';

const { Title } = Typography;

type RegisterProps = {
  visible: boolean;
  onCancel: () => void;
  onRegister: (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm: string;
  }) => void;
};

export const Register: React.FC<RegisterProps> = ({
  visible,
  onCancel,
  onRegister,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onRegister(values);
  };

  return (
    <Modal
      open={visible}
      title={<Title level={4} className={styles.title}>Регистрация</Title>}
      footer={null}
      onCancel={onCancel}
      centered
      className={styles.modal}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{}}
      >
        <Form.Item
          label="Имя"
          name="firstName"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Имя"
            size="large"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{ required: true, message: 'Введите фамилию' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Фамилия"
            size="large"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: 'Введите e-mail' },
            { type: 'email', message: 'Неправильный формат e-mail' },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="example@domain.com"
            size="large"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••••"
            size="large"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          label="Подтвердите пароль"
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Подтвердите пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••••"
            size="large"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className={styles.submit}
          >
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
