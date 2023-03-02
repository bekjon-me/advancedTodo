import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { MAIN, PROFILE } from '../../router/utils';
import userImg from '../../assets/images/user.png';
import { useAuth } from '../../hooks/UseAuth';

export default function Header() {
  const { isUser, username } = useAuth();
  return (
    <section className={styles.header}>
      <Link to={MAIN}>
        <h2 className={styles.logo}>AdvancedTodo</h2>
      </Link>
      <Link to={PROFILE}>
        <div className={styles.profile}>
          <span className={styles.login}>{isUser ? username : 'Login'}</span>
          <img className={styles.userImg} src={userImg} alt='user image' />
        </div>
      </Link>
    </section>
  );
}
