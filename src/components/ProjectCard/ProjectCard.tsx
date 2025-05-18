import React from 'react'
import styles from './ProjectCard.module.css'

import { Card, Row, Col, Button } from 'antd'
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
  <Card
    className={styles.card}
    size="small"
    styles={{
      body: {
        padding: 0
      }
    }}
  >
    <Row align="middle" justify="space-between" style={{ height: '3rem' }}>
      {[
        { span: 4, content: fullName },
        { span: 6, content: projectName },
        { span: 8, content: description },
        { span: 4, content: creatorOrMember },
      ].map((col, i) => (
        <Col
          key={i}
          span={col.span}
          style={{
            borderRight: i < 4 ? '1px solid #ccc' : undefined,
          }}
          className={styles.col}
        >
          {col.content}
        </Col>
      ))}

      {/* Иконки */}
      <Col span={1} style={{ textAlign: 'center' }}>
        <Button
          type="text"
          icon={<EnterOutlined />}
          onClick={onOpen}
        />
      </Col>
      <Col span={1} style={{ textAlign: 'center' }}>
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={onDelete}
        />
      </Col>
    </Row>
  </Card>
)
