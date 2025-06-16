import React, { useMemo, useState } from 'react';
import styles from './Tasks.module.css';
import { TaskCard } from '../TaskCard/TaskCard';
import { Button, Layout, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { CreateTask } from '../CreateTask/CreateTask';
import { CanvasModal } from '../Canvas/CanvasModal';
import { DeleteTaskModal } from './DeleteTaskModal';

const { Content } = Layout;

const CanvasIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="12" rx="2" />
    <path d="M4 16h16" />
  </svg>
);

export const Tasks: React.FC = () => {
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpenCanvas = () => setIsCanvasOpen(true);
  const handleDeleteTask = () => setIsDeleteOpen(true);

  const tasks = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, idx) => ({
        id: String(idx + 1),
        name: `Задача №${idx + 1}`,
        description: `Описание задачи ${idx + 1}`,
        dueDate: new Date(Date.now() + (idx + 1) * 86400000).toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: idx % 3 === 0 ? 'open' : idx % 3 === 1 ? 'in_progress' : 'completed',
        tags: idx % 2 === 0 ? ['frontend', 'design'] : ['backend'],
      })),
    []
  );

  return (
    <>
      <Layout>
        <Content
          style={{
            margin: '2rem',
            background: '#fff',
            borderRadius: 8,
            padding: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <Button type="primary" onClick={() => setIsModalCreate(true)}>
              Добавить задачу
            </Button>
            <Tooltip title="Холст">
              <Button icon={<CanvasIcon />} onClick={handleOpenCanvas} shape="circle" />
            </Tooltip>
            <Tooltip title="Удалить задачу">
              <Button icon={<DeleteOutlined />} danger onClick={handleDeleteTask} shape="circle" />
            </Tooltip>
          </div>

          <div className={styles.tableScrollArea}>
            <div className={`${styles.row} ${styles.header}`}>
              <div className={styles.cell}>Название</div>
              <div className={styles.cell}>Описание</div>
              <div className={styles.cell}>Время выполнения</div>
              <div className={styles.cell}>Статус</div>
              <div className={styles.cell}>Тег</div>
            </div>
            {tasks.map(task => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>
        </Content>
      </Layout>

      <CreateTask visible={isModalCreate} onCancel={() => setIsModalCreate(false)} />
      <CanvasModal open={isCanvasOpen} onClose={() => setIsCanvasOpen(false)} />
      <DeleteTaskModal visible={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} />
    </>
  );
};
