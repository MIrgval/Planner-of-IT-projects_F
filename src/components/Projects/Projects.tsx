import React, { useMemo } from 'react'
import styles from './Projects.module.css'
import { Layout } from 'antd'
import { ProjectCard } from '../ProjectCard/ProjectCard'

const { Content } = Layout

export const Projects: React.FC = () => {
  const headers = ['Имя', 'Проект', 'Описание', 'Роль', 'Действия']
  // Пропорции колонок: 4, 6, 8, 4, 2
  const headerFlex = [4, 6, 8, 4, 2]

  const placeholders = useMemo(() => (
    Array.from({ length: 20 }).map((_, idx) => ({
      id: String(idx + 1),
      fullName: `Иванов И.И. ${idx + 1}`,
      projectName: `Проект №${idx + 1}`,
      description: `Описание проекта ${idx + 1}`,
      creatorOrMember: idx % 2 === 0 ? 'Создатель' : 'Участник',
    }))
  ), [])

  return (
    <Layout style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Content className={styles.content}>
        {/* Липкий заголовок */}
        <div className={styles.header}>
          {headers.map((text, i) => (
            <div
              key={i}
              className={styles.cell}
              style={{ flex: headerFlex[i] }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* Прокручиваемый список */}
        <div className="scrollable" style={{ flex: 1, overflowY: 'auto', padding: '0 1rem', }}>
          {placeholders.map(item => (
            <ProjectCard
              key={item.id}
              fullName={item.fullName}
              projectName={item.projectName}
              description={item.description}
              creatorOrMember={item.creatorOrMember}
              onOpen={() => console.log('Open', item.id)}
              onDelete={() => console.log('Delete', item.id)}
            />
          ))}
        </div>
      </Content>
    </Layout>
  )
}
