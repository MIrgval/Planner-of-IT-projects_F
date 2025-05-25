import React from 'react'
import styles from './Home.module.css'
import { Layout } from 'antd'

import { MyHeader } from '../../components/Header/Header'
import { Projects } from '../../components/Projects/Projects'

export const Home: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <MyHeader />
      <Layout className={styles.content}>
        <Projects />
      </Layout>
    </Layout>
  )
}