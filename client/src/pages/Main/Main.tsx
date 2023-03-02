import React from 'react';
import styles from './Main.module.scss';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Tag from '../../components/Tag/Tag';
import TaskCard from '../../components/TaskCard/TaskCard';
import Modal from '../../components/Modal/Modal';
import AddProjectModal from '../../components/Modal/AddProjectModal';
import { useTodos } from '../../hooks/useTodos';

export default function Main() {
  const [modal, setModal] = React.useState<null | string>(null);
  const [selectedTags, setSelectedtags] = React.useState<string[]>([]);
  const { projects, activeTags, todos } = useTodos();

  const handleAdd = (type: string) => {
    setModal(type);
  };

  const handleFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedtags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedtags([...selectedTags, tag]);
    }
  };

  return (
    <div className={`container ${styles.main}`}>
      <Header />
      <div className={styles.actions}>
        <Button className={styles.addBtn} onClick={() => handleAdd('todo')}>
          Add Todo
        </Button>
        <Button
          className={styles.addBtn + ' ' + styles.addProjectBtn}
          onClick={() => handleAdd('project')}
        >
          Add Project
        </Button>
      </div>

      <div className={styles.tags}>
        {projects.length === 0 ? (
          <p className={styles.nothing}>You haven't got any project yet</p>
        ) : (
          projects.map((tag: any) => (
            <Tag
              key={tag.id}
              name={tag.name}
              color={tag.color}
              className={selectedTags.includes(tag.name) ? 'selected' : ''}
              onClick={() => handleFilter(tag.name)}
            />
          ))
        )}
      </div>

      <h2 className={styles.projectName}>
        {activeTags.length === 0
          ? 'All'
          : projects.map((project) => <p key={project.name}>{project.name}</p>)}
      </h2>

      <div className={styles.tasks}>
        {todos.map((todo) => (
          <TaskCard todo={todo} />
        ))}
      </div>

      {modal ? (
        modal === 'todo' ? (
          <Modal setModal={setModal} />
        ) : (
          <AddProjectModal setModal={setModal} />
        )
      ) : (
        ''
      )}
    </div>
  );
}
