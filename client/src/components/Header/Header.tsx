import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { MAIN, PROFILE } from "../../router/utils";
import userImg from "../../assets/images/user.png";

export default function Header() {
  return (
    <section className={styles.header}>
      <Link to={MAIN}>
        <h2 className={styles.logo}>AdvancedTodo</h2>
      </Link>
      <Link to={PROFILE}>
        <img className={styles.userImg} src={userImg} alt="user image" />
      </Link>
    </section>
  );
}
