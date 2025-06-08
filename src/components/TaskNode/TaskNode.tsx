import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import styles from './TaskNode.module.css';

type TaskNodeData = {
  id: string;
  name: string;
  teg_id: string;
  status: 'waiting' | 'in_progress' | 'overdue' | 'completed';
  description: string;
  task_duration: string;
  project_id: string;
};

const statusToClass = (status: TaskNodeData['status']) => {
  switch (status) {
    case 'waiting':
      return styles.waiting;
    case 'in_progress':
      return styles.inProgress;
    case 'overdue':
      return styles.overdue;
    case 'completed':
      return styles.completed;
    default:
      return styles.waiting;
  }
};

export const TaskNode: React.FC<NodeProps<TaskNodeData>> = ({ data, selected }) => (
  <div className={`${styles.card} ${statusToClass(data.status)} ${selected ? styles.selected : ''}`}>
    {/* Handles for connecting */}
    <Handle type="target" position={Position.Left} className={styles.handle} />
    <Handle type="source" position={Position.Right} className={styles.handle} />

    <div className={styles.header}>{data.name}</div>
    <div className={styles.content}>
      <div className={styles.desc}>{data.description}</div>
    </div>
    <div className={styles.footer}>
      <div className={styles.deadline}>{data.task_duration}</div>
      <div className={styles.tegBlock}>
        <span className={styles.tagHash}>#</span>
        <span className={styles.tagName}>{data.teg_id}</span>
      </div>
    </div>
  </div>
);

export default TaskNode;
