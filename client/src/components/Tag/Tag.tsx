import React from "react";
import styles from "./Tag.module.scss";

interface IProps {
  name: string;
  color: string;
}

export default function Tag(props: IProps) {
  return (
    <div className={styles.tag}>
      <div
        className={styles.circle}
        style={{ backgroundColor: props.color }}
      ></div>
      <h2>{props.name}</h2>
    </div>
  );
}
