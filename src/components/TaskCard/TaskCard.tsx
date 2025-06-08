import React from 'react';
import styles from '../Tasks/Tasks.module.css';
import { Tag } from 'antd';

interface TaskCardProps {
  name: string;
  description: string;
  dueDate: string;
  status: string;
  tags: string[];
}

export const TaskCard: React.FC<TaskCardProps> = ({
  name,
  description,
  dueDate,
  status,
  tags,
}) => (
  <div className={`${styles.row} ${styles.cardRow}`}>
    <div className={styles.cell}>{name}</div>
    <div className={styles.cell}>{description}</div>
    <div className={styles.cell}>{dueDate}</div>
    <div className={styles.cell}>
      <Tag color={
        status === 'open'
          ? 'blue'
          : status === 'in_progress'
          ? 'orange'
          : status === 'completed'
          ? 'green'
          : 'default'
      }>
        {
          status === 'open' ? 'Открыто' :
          status === 'in_progress' ? 'В процессе' :
          status === 'completed' ? 'Завершено' : status
        }
      </Tag>
    </div>
    <div className={styles.cell}>
      {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
    </div>
  </div>
);
