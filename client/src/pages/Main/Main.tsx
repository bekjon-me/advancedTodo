import React from 'react';
import styles from './Main.module.scss';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Tag from '../../components/Tag/Tag';
import TaskCard from '../../components/TaskCard/TaskCard';
import Modal from '../../components/Modal/Modal';
import AddProjectModal from '../../components/Modal/AddProjectModal';
import { useTodos } from '../../hooks/useTodos';
import { withTokenInstance } from '../../axios/axios';
import { Project } from '../../app/@types.data';
import { useAppDispatch } from '../../app/hooks';
import { setActiveTag, setTodos } from '../../app/TodosSlice';
import Loader from '../../components/Loader/Loader';

export default function Main() {
  const [modal, setModal] = React.useState<null | string>(null);
  const [selectedTag, setSelectedtag] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const { projects, activeTag, todos } = useTodos();
  const dispatch = useAppDispatch();

  const handleAdd = (type: string) => {
    setModal(type);
  };

  const handleFilter = async (name: string, id: number) => {
    if (selectedTag === name) {
      setSelectedtag('');
    } else {
      setSelectedtag(name);
      setLoading(true);
      try {
        const res = await withTokenInstance.get(`api-v1/projects/${id}/tasks/`);
        dispatch(setTodos(res.data));
        dispatch(setActiveTag(name));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
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
          projects.map((project: Project) => (
            <Tag
              key={project.upid}
              name={project.name}
              className={selectedTag.includes(project.name) ? 'selected' : ''}
              onClick={() => handleFilter(project.name, project.upid)}
            />
          ))
        )}
      </div>

      <h2 className={styles.projectName}>{activeTag}</h2>

      <div className={styles.tasks}>
        {loading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : todos.length === 0 ? (
          <p className={styles.nothing}>
            You haven't got any todo yet in this project
          </p>
        ) : (
          todos.map((todo) => <TaskCard key={todo.ptid} todo={todo} />)
        )}
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
