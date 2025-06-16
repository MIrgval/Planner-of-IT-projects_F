import React, { useState } from 'react';
import { Button, Typography, Card, Space } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import styles from './Face.module.css';

// Импорты модалок (проверь свои пути!)
// Например:
import {Register } from '../../components/Register/Register';
import {Login } from '../../components/Login/Login';
import {ResetPassword } from '../../components/Reset-password/Reset';


const { Title, Paragraph } = Typography;

export const Face: React.FC = () => {
  // Состояния для модальных окон
  const [isModalRegister, setIsModalRegister] = useState(false);
  const [isModalLogin, setIsModalLogin] = useState(false);
  const [isModalReset, setIsModalReset] = useState(false);

  // Обработчики (можешь заменить на свои)
  const handleSubmit = (data: any) => {
    // Логика логина/регистрации
    setIsModalLogin(false);
    setIsModalRegister(false);
  };

  const handleForgotPassword = () => {
    setIsModalLogin(false);
    setIsModalReset(true);
  };

  const handleResetSend = (data: any) => {
    // Логика восстановления пароля
    setIsModalReset(false);
  };

  return (
    <>
      <div className={styles.bg}>
        {/* Анимированные круги */}
        <div className={styles.bubbles}>
          <div className={styles.bubble + " " + styles.bubble1}></div>
          <div className={styles.bubble + " " + styles.bubble2}></div>
          <div className={styles.bubble + " " + styles.bubble3}></div>
          <div className={styles.bubble + " " + styles.bubble4}></div>
          <div className={styles.bubble + " " + styles.bubble5}></div>
        </div>

        <Card className={styles.card} bordered={false}>
          <div className={styles.iconWrap}>
            <RocketOutlined style={{ fontSize: 56, color: '#715aff' }} />
          </div>
          <Title level={2} className={styles.title}>Planner of IT Projects</Title>
          <Paragraph className={styles.desc}>
            Современный инструмент для планирования, управления и визуализации командных проектов.<br/>
            Используйте канбан, холст, диаграмму Ганта и многое другое!
          </Paragraph>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Button
              type="primary"
              size="large"
              className={styles.startBtn}
              onClick={() => setIsModalLogin(true)}
              block
            >
              Войти
            </Button>
            <Button
              type="default"
              size="large"
              className={styles.startBtn}
              onClick={() => setIsModalRegister(true)}
              block
            >
              Зарегистрироваться
            </Button>
          </Space>
        </Card>
        <div className={styles.footer}>© {new Date().getFullYear()} Planner IT</div>
      </div>

      {/* Модальные окна по аналогии с хедером */}
      <Register
        visible={isModalRegister}
        onCancel={() => setIsModalRegister(false)}
        onRegister={handleSubmit}
      />

      <Login
        visible={isModalLogin}
        onCancel={() => setIsModalLogin(false)}
        onLogin={handleSubmit}
        onForgotPassword={handleForgotPassword}
      />

      <ResetPassword
        visible={isModalReset}
        onCancel={() => setIsModalReset(false)}
        onSend={handleResetSend}
      />
    </>
  );
};
