import React, { useMemo, useState } from 'react';
import { Layout, Button } from 'antd';
import {
  PlusOutlined,
  CodeOutlined,
  DatabaseOutlined,
  HighlightOutlined,
} from '@ant-design/icons';
import styles from './Sider.module.css';

import { AddMemberModal } from '../../components/ProjectModals/AddMemberModal';
import { EditMembersModal } from '../../components/ProjectModals/EditMembersModal';
import { TagListModal } from '../../components/ProjectModals/TagListModal';

const { Sider } = Layout;

const getTagIcon = (tag: string) => {
  switch (tag) {
    case 'frontend':
      return <CodeOutlined />;
    case 'backend':
      return <DatabaseOutlined />;
    case 'design':
      return <HighlightOutlined />;
    default:
      return null;
  }
};

const getTagClass = (tag: string) => {
  switch (tag) {
    case 'frontend':
      return styles.userTagFrontend;
    case 'backend':
      return styles.userTagBackend;
    case 'design':
      return styles.userTagDesign;
    default:
      return '';
  }
};

export const MySider: React.FC = () => {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isTagsVisible, setIsTagsVisible] = useState(false);

  const participantsData = useMemo(() => {
    const raw = localStorage.getItem('mock_project_members');
    return raw ? JSON.parse(raw) : [];
  }, []);

  const tagsData = [
    { key: 1, name: 'frontend' },
    { key: 2, name: 'backend' },
    { key: 3, name: 'design' },
    { key: 4, name: 'analytics' },
    { key: 5, name: 'QA' },
  ];

  return (
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
            <Button
              className={styles.addButton}
              type="primary"
              size="small"
              onClick={() => setIsAddVisible(true)}
            >
              Добавить участника
            </Button>
            <Button
              className={styles.addButton}
              size="small"
              onClick={() => setIsEditVisible(true)}
            >
              Редактирование
            </Button>
          </div>
          <div className={styles.userList}>
            {participantsData.map((user: any) => (
              <div className={styles.userRow} key={user.id}>
                <span className={styles.userName}>{user.name}</span>
                <span className={`${styles.userTagIcon} ${getTagClass(user.tag)}`}>
                  {getTagIcon(user.tag)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Теги проекта */}
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
                onClick={() => setIsTagsVisible(true)}
              />
            </span>
          </div>
          <div className={styles.tegList}>
            {tagsData.map((tag) => (
              <div className={styles.userRow} key={tag.key}>
                <span className={styles.userName} style={{ marginRight: 0, minWidth: 76 }}>
                  {tag.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модальные окна */}
      <AddMemberModal visible={isAddVisible} onClose={() => setIsAddVisible(false)} />
      <EditMembersModal visible={isEditVisible} onClose={() => setIsEditVisible(false)} />
      <TagListModal visible={isTagsVisible} onClose={() => setIsTagsVisible(false)} />
    </Sider>
  );
};
