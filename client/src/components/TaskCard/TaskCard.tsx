import React from 'react';
import { Project, Todo } from '../../app/@types.data';
import { useTodos } from '../../hooks/useTodos';
import Tag from '../Tag/Tag';
import styles from './TaskCard.module.scss';

export default function TaskCard({ todo }: { todo: Todo }) {
  const [modal, setModal] = React.useState(false);
  const { projects, activeTag } = useTodos();

  const handleModalToggle = () => {
    setModal(!modal);
  };

  return (
    <div className={styles.card}>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>

      <div className={styles.edit} onClick={handleModalToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        className={styles.editModal}
        style={{ display: modal ? 'flex' : 'none' }}
      >
        <span>Edit...</span>
        <hr />
        <span>Delete</span>
      </div>

      <div className={styles.checkBox}>
        <label>done</label>
        <input type='checkbox' />
      </div>
    </div>
  );
}
