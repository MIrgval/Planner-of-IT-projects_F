import React from 'react'
import { Hero } from '../../components/Hero/Hero'
import { Description } from '../../components/Description/Description'
import styles from './Face.module.css'
import { Footer } from '../../components/Footer/Footer'
import { MyHeader } from '../../components/Header/Header'

export const Face: React.FC = () => {
  return (
  <div className={styles.page}>
    <MyHeader />
    <div className={styles.scrollArea}>
      <div className={styles.container}>
        <Hero />
        <Description />
      </div>
      <Footer />
    </div>
  </div>
  )
}
