// MyHeader.tsx
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import styles from './Header.module.css';
import { Button, Layout } from 'antd';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { ResetPassword } from '../Reset-password/Reset';

const { Header } = Layout;

export const MyHeader: React.FC = () => {
  const [isModalRegister, setIsModalRegister] = useState(false);
  const [isModalLogin, setIsModalLogin] = useState(false);
  const [isModalReset, setIsModalReset] = useState(false);

  // общий обработчик для регистрации и логина
  const handleSubmit = (values: any) => {
    console.log('Submitted:', values);
    setIsModalRegister(false);
    setIsModalLogin(false);
  };

  // когда юзер кликает «Забыли пароль?» в Login
  const handleForgotPassword = () => {
    setIsModalLogin(false);
    setIsModalReset(true);
  };

  // когда юзер шлёт e-mail для сброса
  const handleResetSend = (email: string) => {
    console.log('Reset link to:', email);
    // тут ваш API-запрос
    setIsModalReset(false);
  };

  return (
    <>
      <Header className={styles.header}>
        <img src={logo} alt="Логотип" className={styles.logo} />
        <div className={styles.buttons}>
          <Button
            type="primary"
            className={styles.button}
            onClick={() => setIsModalLogin(true)}
          >
            Авторизация
          </Button>
          <Button
            type="primary"
            className={styles.button}
            onClick={() => setIsModalRegister(true)}
          >
            Регистрация
          </Button>
        </div>
      </Header>

      {/* Регистрация */}
      <Register
        visible={isModalRegister}
        onCancel={() => setIsModalRegister(false)}
        onRegister={handleSubmit}
      />

      {/* Логин */}
      <Login
        visible={isModalLogin}
        onCancel={() => setIsModalLogin(false)}
        onLogin={handleSubmit}
        onForgotPassword={handleForgotPassword}  // передаём сюда переключатель
      />

      {/* Восстановление пароля */}
      <ResetPassword
        visible={isModalReset}
        onCancel={() => setIsModalReset(false)}
        onSend={handleResetSend}
      />
    </>
  );
};
