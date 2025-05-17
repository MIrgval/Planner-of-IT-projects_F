import React from 'react'
import Styles from './Footer.module.css'

export const Footer: React.FC = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <h1>Footer</h1>
      </div>
    </footer>
  )
}
