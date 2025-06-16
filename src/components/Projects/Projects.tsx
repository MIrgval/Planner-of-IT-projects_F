import React, { useMemo, useState, useEffect } from 'react';
import styles from './Projects.module.css';
import { Button, Layout, Space, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { CreateProject } from '../CreateProject/CreateProject';
import { GroupMembersModal } from '../Group/GroupMembersModal';
import { InviteModal } from '../Group/InviteModal';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

export const Projects: React.FC = () => {
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [groupName, setGroupName] = useState('Jer');
  const navigate = useNavigate();

  // 📡 Пример загрузки названия группы с API
  /*
  useEffect(() => {
    fetch('/api/group/current')
      .then(res => res.json())
      .then(data => {
        setGroupName(data.name);
      })
      .catch(console.error);
  }, []);
  */

  const headers = ['Имя', 'Проект', 'Описание', 'Роль', 'Действия'];

  const placeholders = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, idx) => ({
        id: String(idx + 1),
        fullName: `Иванов И.И. ${idx + 1}`,
        projectName: `Проект №${idx + 1}`,
        description: `Описание проекта ${idx + 1}`,
        creatorOrMember: idx % 2 === 0 ? 'Создатель' : 'Участник',
      })),
    []
  );

  return (
    <>
      <Content className={styles.pageHeader}>
        <div className={styles.pageTitle}>
           <span className={styles.groupTag}>{groupName}</span>
        </div>
        <Space>
          <Button onClick={() => setIsInviteOpen(true)}>Приглашение</Button>
          <Tooltip title="Участники">
            <Button
              shape="circle"
              icon={<UserOutlined />}
              onClick={() => setIsMembersOpen(true)}
            />
          </Tooltip>
          <Button
            type="primary"
            size="large"
            className={styles.addButton}
            onClick={() => setIsModalCreate(true)}
          >
            Создать проект
          </Button>
        </Space>
      </Content>

      <Layout style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Content
          style={{
            margin: '1rem 2rem 2rem',
            background: '#fff',
            borderRadius: 8,
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className={styles.header}>
            {headers.map((text, i) => (
              <div key={i} className={`${styles.cell} ${styles[`col-${i}`]}`}>
                {text}
              </div>
            ))}
          </div>

          <div
            className="scrollable"
            style={{ flex: 1, overflowY: 'auto', padding: '0 1rem' }}
          >
            {placeholders.map((item, idx) => (
              <ProjectCard
                key={item.id}
                fullName={item.fullName}
                projectName={item.projectName}
                description={item.description}
                creatorOrMember={item.creatorOrMember}
                onOpen={() => {
                  if (idx === 0) {
                    navigate('/project');
                  } else {
                    console.log('Open', item.id);
                  }
                }}
                onDelete={() => console.log('Delete', item.id)}
              />
            ))}
          </div>
        </Content>
      </Layout>

      <CreateProject
        visible={isModalCreate}
        onCancel={() => setIsModalCreate(false)}
      />

      <GroupMembersModal
        visible={isMembersOpen}
        onClose={() => setIsMembersOpen(false)}
      />

      <InviteModal
        visible={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
    </>
  );
};
