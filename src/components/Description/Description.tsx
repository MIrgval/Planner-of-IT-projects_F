import React from 'react';
import styles from './Description.module.css';
import { Col, Layout, Row } from 'antd';

export const Description: React.FC = () => {
  return (
    <Layout>
      <Row className={styles.description}>
        <Col span={12}>
          <div className={styles.window}>Демонстрация</div>
        </Col>
        <Col span={12}>
          <div className={styles.window}>Описание</div>
        </Col>
        <Col span={12}>
          <div className={styles.window}>Окно</div>
        </Col>
        <Col span={12}>
          <div className={styles.window}>Окно</div>
        </Col>
        <Col span={12}>
          <div className={styles.window}>Окно</div>
        </Col>
        <Col span={12}>
          <div className={styles.window}>Окно</div>
        </Col>
      </Row>
    </Layout>
  );
};
