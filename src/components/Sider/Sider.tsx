import React from 'react'
import { Layout, Typography, Card, Button, Table, Col, Row } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styles from './Sider.module.css'

const { Sider } = Layout
const { Title } = Typography

// 1) Определяем колонки для таблицы участников
const participantsColumns = [
  {
    title: 'Имя',              // заголовок колонки
    dataIndex: 'name',
    key: 'name',
    width: '50%',
    align: 'center' as const,
    onHeaderCell: () => ({ className: styles.grayHeader }),
    onCell: () => ({ className: styles.grayCell }),
  },
  {
    title: '#тег',
    dataIndex: 'tag',
    key: 'tag',
    width: '50%',
    align: 'center' as const,
    onHeaderCell: () => ({ className: styles.grayHeader }),
    onCell: () => ({ className: styles.grayCell }),
  },
]

const tagsColumns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    align: 'center' as const,
    onHeaderCell: () => ({ className: styles.grayHeader }),
    onCell: () => ({ className: styles.grayCell }),
  },
]

const Creator = true;

export const MySider: React.FC = () => {
  return (
    <Sider width={400} className={styles.sider}>
      <div className={styles.inner}>
        {/* Коробка с названием */}
        <Card size="small" className={styles.titleBox}>
          <Title level={4} className={styles.projectTitle}>
            Название проекта
          </Title>
        </Card>

        {/* Блок «Участники» */}
        <Card
          size="small"
          className={`${styles.panel} ${styles.panelLarge}`}
          title="Участники"
          styles={{
            header: {
              textAlign: 'center'
            },
            body: {
              padding: 0
            }
          }}
        >
          {Creator && <Row>
            <Col span={12}>
              <Button size="middle" block style={{ borderRadius: 0 }}>Добавить участника</Button>
            </Col>
            <Col span={12}>
              <Button size="middle" block style={{ borderRadius: 0 }}>Редактирование</Button>
            </Col>
          </Row>}
          <Table
            size="small"
            pagination={false}
            dataSource={[]}        // сюда участники
            rowKey="id"
            columns={participantsColumns}
          />
        </Card>

        {/* Блок «Теги проекта» */}
        <Card
          size="small"
          className={`${styles.panel} ${styles.panelSmall}`}
          title="Теги проекта"
          extra={Creator && <Button size="small" icon={<PlusOutlined />} />}
          styles={{
            header: {
              textAlign: 'center',
              marginLeft: Creator ? '1.5rem' : 0,
            },
            body: {
              padding: 0
            }
          }}
        >
          <Table
            size="small"
            pagination={false}
            dataSource={[]}        // сюда теги
            rowKey="tag"
            columns={tagsColumns}
          />
        </Card>
      </div>
    </Sider>
  )
}
