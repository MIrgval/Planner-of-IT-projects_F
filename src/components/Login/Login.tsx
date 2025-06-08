import React from 'react';
import { Modal, Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import styles from './Login.module.css';

const { Title, Link } = Typography;

type LoginProps = {
  visible: boolean;
  onCancel: () => void;
  onLogin: (values: { email: string; password: string; remember: boolean }) => void;
  onForgotPassword?: () => void;
};

export const Login: React.FC<LoginProps> = ({
  visible,
  onCancel,
  onLogin,
  onForgotPassword,
}) => {
  const [form] = Form.useForm();


  return (
    <Modal
      open={visible}
      title={<Title level={4} className={styles.title}>Вход</Title>}
      footer={null}
      onCancel={onCancel}
      centered
      className={styles.modal}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onLogin}
        initialValues={{ remember: false }}
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: 'Введите ваш e-mail' }, { type: 'email', message: 'Неверный формат' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="example@domain.com"
            size="large"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            placeholder="••••••••"
            size="large"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox className={styles.checkbox}>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className={styles.loginButton}
          >
            Войти
          </Button>
        </Form.Item>

        <div className={styles.footerLink}>
          <Link onClick={onForgotPassword}>Забыли пароль?</Link>
        </div>
      </Form>
    </Modal>
  );
};
