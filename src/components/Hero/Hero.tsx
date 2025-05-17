import React from 'react';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      {/* Ваш контент: фон, текст, кнопки и т.п. */}
      <h1 className={styles.title}>Проект</h1>
    </section>
  );
};
