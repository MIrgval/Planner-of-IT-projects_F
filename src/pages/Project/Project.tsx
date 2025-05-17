import { Layout, Typography } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import styles from './Project.module.css'

const { Content } = Layout;

export const Project: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={400} style={{ outline: '1px solid black' }}>
        <Typography.Text>Hello</Typography.Text>
      </Sider>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
            }}
          >
            <p>long content</p>
            {
              // indicates very long content
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? 'more' : '...'}
                  <br />
                </React.Fragment>
              ))
            }
          </div>
        </Content>
    </Layout>
  )
}
