import React from 'react';
import { Layout, Button } from 'antd';
import { PlusOutlined, CodeOutlined, DatabaseOutlined, HighlightOutlined } from '@ant-design/icons';
import styles from './Sider.module.css';

const { Sider } = Layout;

// Участники (оставляем иконки)
const participantsData = [
  { key: 1, fullname: 'Иван Петров', tag: 'frontend' },
  { key: 2, fullname: 'Мария Сидорова', tag: 'backend' },
  { key: 3, fullname: 'Ольга Фролова', tag: 'frontend' },
  { key: 4, fullname: 'Павел Сергеев', tag: 'design' },
  { key: 5, fullname: 'Кирилл Макаров', tag: 'backend' },
  { key: 6, fullname: 'Саша Ли', tag: 'frontend' },
  { key: 7, fullname: 'Павел Сергеев', tag: 'design' },
  { key: 8, fullname: 'Кирилл Макаров', tag: 'backend' },
  { key: 9, fullname: 'Саша Ли', tag: 'frontend' },
  { key: 10, fullname: 'Кирилл Макаров', tag: 'backend' },
  { key: 11, fullname: 'Саша Ли', tag: 'frontend' },
  { key: 12, fullname: 'Павел Сергеев', tag: 'design' },
  { key: 13, fullname: 'Кирилл Макаров', tag: 'backend' },
  { key: 14, fullname: 'Саша Ли', tag: 'frontend' },
];

// Теги проекта — только названия!
const tagsData = [
  { key: 1, name: 'frontend' },
  { key: 2, name: 'backend' },
  { key: 3, name: 'design' },
  { key: 4, name: 'analytics' },
  { key: 5, name: 'QA' },
  { key: 6, name: 'frontend' },

];

const getTagIcon = (tag: string) => {
  switch (tag) {
    case 'frontend': return <CodeOutlined />;
    case 'backend': return <DatabaseOutlined />;
    case 'design': return <HighlightOutlined />;
    default: return null;
  }
};
const getTagClass = (tag: string) => {
  switch (tag) {
    case 'frontend': return styles.userTagFrontend;
    case 'backend': return styles.userTagBackend;
    case 'design': return styles.userTagDesign;
    default: return '';
  }
};

export const MySider: React.FC = () => (
  <Sider width={340} className={styles.sider}>
    {/* Название проекта */}
    <div className={styles.projectCard}>
      <span className={styles.projectTitle}>Название проекта</span>
    </div>
    <div className={styles.centeredBlocks}>
      {/* Участники */}
      <div className={styles.cardUser}>
        <div className={styles.sectionTitleCenter}>Участники</div>
        <div className={styles.buttonRow}>
          <Button className={styles.addButton} type="primary" size="small">
            Добавить участника
          </Button>
          <Button className={styles.addButton} size="small">
            Редактирование
          </Button>
        </div>
        <div className={styles.userList}>
          {participantsData.map((user) => (
            <div className={styles.userRow} key={user.key}>
              <span className={styles.userName}>{user.fullname}</span>
              <span className={`${styles.userTagIcon} ${getTagClass(user.tag)}`}>
                {getTagIcon(user.tag)}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Теги проекта — только название! */}
      <div className={styles.cardTeg}>
        <div className={styles.sectionTitleWrap}>
          <span className={styles.sectionTitleCenter}>Теги проекта</span>
          <span className={styles.sectionTitleRightBtn}>
            <Button
              className={styles.addTagButton}
              size="small"
              type="dashed"
              shape="circle"
              icon={<PlusOutlined />}
            />
          </span>
        </div>
        <div className={styles.tegList}>
          {tagsData.map((tag) => (
            <div className={styles.userRow} key={tag.key}>
              <span
                className={styles.userName}
                style={{ marginRight: 0, minWidth: 76 }}
              >
                {tag.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Sider>
);
