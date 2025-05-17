import React from 'react'
import { Hero } from '../../components/Hero/Hero'
import { Description } from '../../components/Description/Description'
import styles from './Main.module.css'
import { Footer } from '../../components/Footer/Footer'

export const Main: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Hero />
        <Description />
      </ div>
      <Footer />
    </>
  )
}
