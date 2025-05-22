import React from 'react'
import styles from './Tasks.module.css'
import { Button, Layout, Typography } from 'antd'
import { Header } from 'antd/es/layout/layout'

const { Title } = Typography;
const { Content } = Layout

export const Tasks: React.FC = () => {
  const headers = ['Название', 'Описание', 'Время выполнения', 'Статус', 'Тег']
  const headerFlex = [4, 8, 4, 4, 4]

  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div className={`${styles.headerTable} ${styles.header}`}>
          {headers.map(
            (text, i) => (
              <div key={i} className={styles.cell} style={{ flex: headerFlex[i] }}>
                {text}
              </div>
            )
          )}
        </div>

        {/* Ваш длинный контент */}

        <div className={styles.scrollable}>
          <p>long content</p>
          {Array.from({ length: 100 }, (_, index) => (
            <React.Fragment key={index}>
              {index % 20 === 0 && index ? 'more' : '...'}
              <br />
            </React.Fragment>
          ))}
        </div>
      </Content>
    </Layout>
  )
}
