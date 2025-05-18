import { Layout } from 'antd'
import React from 'react'
import styles from './TheProject.module.css'

import { MyHeader } from '../../components/Header/Header'
import { MySider } from '../../components/Sider/Sider'

const { Content } = Layout

export const TheProject: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <MyHeader />

      <Layout className={styles.main}>
        <MySider />
        <Layout className={styles.innerLayout}>
          <Content className={styles.content}>

            {/* Ваш длинный контент */}
            <p>long content</p>
            {Array.from({ length: 100 }, (_, index) => (
              <React.Fragment key={index}>
                {index % 20 === 0 && index ? 'more' : '...'}
                <br />
              </React.Fragment>
            ))}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
