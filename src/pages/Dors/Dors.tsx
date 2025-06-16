import React, { useState } from 'react';
import { Button, Typography, Card, Space } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import styles from './Dors.module.css';
import { MyHeader } from '../../components/Header/Header';
import { CreateGroupModal } from '../../components/Group/CreateGroupModal';
import { JoinGroupModal } from '../../components/Group/JoinGroupModal';

const { Title, Paragraph } = Typography;

export const Dors: React.FC = () => {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleJoin = (code: string) => {
    console.log('Вступить в группу с кодом:', code);
    setIsJoinOpen(false);
  };

  const handleCreate = (name: string) => {
    console.log('Создать группу с названием:', name);
    setIsCreateOpen(false);
  };

  return (
    <>
      <MyHeader />
      <div className={styles.bg}>
        {/* Анимированный фон */}
        <div className={styles.bubbles}>
          <div className={`${styles.bubble} ${styles.bubble1}`}></div>
          <div className={`${styles.bubble} ${styles.bubble2}`}></div>
          <div className={`${styles.bubble} ${styles.bubble3}`}></div>
          <div className={`${styles.bubble} ${styles.bubble4}`}></div>
          <div className={`${styles.bubble} ${styles.bubble5}`}></div>
        </div>

        <Card className={styles.card} bordered={false}>
          <div className={styles.iconWrap}>
            <TeamOutlined style={{ fontSize: 56, color: '#1890ff' }} />
          </div>
          <Title level={2} className={styles.title}>Добро пожаловать</Title>
          <Paragraph className={styles.desc}>
            Выберите действие ниже, чтобы начать работу с группами.
          </Paragraph>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Button
              type="primary"
              size="large"
              className={styles.startBtn}
              block
              onClick={() => setIsJoinOpen(true)}
            >
              Вступить в группу
            </Button>
            <Button
              type="default"
              size="large"
              className={styles.startBtn}
              block
              onClick={() => setIsCreateOpen(true)}
            >
              Создать группу
            </Button>
          </Space>
        </Card>
      </div>

      <JoinGroupModal
        visible={isJoinOpen}
        onCancel={() => setIsJoinOpen(false)}
        onJoin={handleJoin}
      />

      <CreateGroupModal
        visible={isCreateOpen}
        onCancel={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
      />
    </>
  );
};
