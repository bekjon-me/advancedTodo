import React from 'react';
import styles from './Tag.module.scss';

interface IProps {
  name?: string;
  color: string;
  className: string;
  onClick?: () => void;
}

export default function Tag(props: IProps) {
  return (
    <div
      className={styles.tag + ' ' + styles[props.className]}
      onClick={props.onClick}
    >
      <div
        className={styles.circle}
        style={{ backgroundColor: props.color }}
      ></div>
      <h2>{props.name}</h2>
    </div>
  );
}
