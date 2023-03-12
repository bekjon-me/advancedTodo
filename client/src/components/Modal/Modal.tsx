import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import Tag from '../Tag/Tag';
import styles from './Modal.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTodos } from '../../app/TodosSlice';
import { Project } from '../../app/@types.data';
import { withTokenInstance } from '../../axios/axios';

interface IProps {
  setModal: (modal: null | string) => void;
}

export default function Modal(props: IProps) {
  const [selectedTag, setSelectedtags] = useState<{ name: string; id: number }>(
    { name: '', id: 0 }
  );
  const { projects } = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const onSubmit = async (values: any) => {
    if (selectedTag.name === '') {
      toast.warning('Please select one of the projects');
      return;
    }

    try {
      const res = await withTokenInstance.post(
        `api-v1/projects/${selectedTag.id}/tasks/`
      );
      toast.success(res.data.name + ' has been added successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTag = async (name: string, id: number) => {
    if (selectedTag.name === name) {
      setSelectedtags({ name: '', id: 0 });
    } else {
      setSelectedtags({
        name,
        id,
      });
    }
  };

  const handleToggleModal = () => {
    props.setModal(null);
  };

  return (
    <div className={styles.modal} onClick={handleToggleModal}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.formAction}>
                <p onClick={handleToggleModal}>Cancel</p>
                <button type='submit'>Add</button>
              </div>
              <div className={styles.input}>
                <label>Title</label>
                <Field
                  name='title'
                  component='input'
                  type='text'
                  placeholder='add a title ...'
                  required
                />
              </div>
              <div className={styles.input}>
                <label>Description</label>
                <Field
                  name='description'
                  component='textarea'
                  placeholder='add a description ...'
                />
              </div>
              <div className={styles.input}>
                <label>
                  Which project would you like to add to this todo? (you must
                  select one project)
                </label>
                <div className={styles.tags}>
                  {projects.map((project: Project) => (
                    <Tag
                      key={project.upid}
                      name={project.name}
                      className={
                        selectedTag.name.includes(project.name)
                          ? 'selected'
                          : ''
                      }
                      onClick={() => handleAddTag(project.name, project.upid)}
                    />
                  ))}
                </div>
              </div>
            </form>
          )}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
