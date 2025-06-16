import React from 'react'
import styles from './ProjectCard.module.css'
import { Button, Tag } from 'antd'
import { DeleteOutlined, EnterOutlined } from '@ant-design/icons'

interface ProjectCardProps {
  fullName: string
  projectName: string
  description: string
  creatorOrMember: string
  onOpen: () => void
  onDelete: () => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  fullName,
  projectName,
  description,
  creatorOrMember,
  onOpen,
  onDelete,
}) => (
  <div className={`${styles.row} ${styles.cardRow}`}>
    <div className={`${styles.cell} ${styles['col-0']}`}>{fullName}</div>
    <div className={`${styles.cell} ${styles['col-1']}`}>{projectName}</div>
    <div className={`${styles.cell} ${styles['col-2']}`}>{description}</div>
    <div className={`${styles.cell} ${styles['col-3']}`}>
      <Tag color={creatorOrMember === 'Создатель' ? 'green' : 'blue'}>
        {creatorOrMember}
      </Tag>
    </div>
    <div className={`${styles.cell} ${styles['col-4']}`} style={{ justifyContent: 'center', gap: 8 }}>
      <Button type="text" icon={<EnterOutlined />} onClick={onOpen} />
      <Button type="text" icon={<DeleteOutlined />} onClick={onDelete} danger />
    </div>
  </div>
)
