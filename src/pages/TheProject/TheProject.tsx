import React from 'react'
import styles from './TheProject.module.css'
import { Layout } from 'antd'

import { MyHeader } from '../../components/Header/Header'
import { MySider } from '../../components/Sider/Sider'
import { Tasks } from '../../components/Tasks/Tasks'

export const TheProject: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <MyHeader />
      <Layout className={styles.main}>
        <MySider />
        <Tasks />
      </Layout>
    </Layout>
  )
}
