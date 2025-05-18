import React from 'react'
import styles from './Home.module.css'
import { Header } from 'antd/es/layout/layout'
import { Button, Layout, Typography } from 'antd'

import { MyHeader } from '../../components/Header/Header'
import { Projects } from '../../components/Projects/Projects'

const { Title } = Typography;

export const Home: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <MyHeader />
      <Header className={styles.header}>
        <Title level={3} style={{marginTop: '0.3rem'}}>Проекты</Title>
        <Button size="large" className={styles.button}>Добавить</Button>
      </Header>
      <Layout className={styles.content}>
        <Projects />
      </Layout>
    </Layout>
  )
}