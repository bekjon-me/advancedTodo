import React from 'react';
import { Field, Form } from 'react-final-form';
import styles from './Modal.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import { withTokenInstance } from '../../axios/axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProject, selectTodos } from '../../app/TodosSlice';
import { Project } from '../../app/@types.data';

interface IProps {
  setModal: (modal: null | string) => void;
}

export default function AddProjectModal(props: IProps) {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector(selectTodos);

  const onSubmit = async (values: any) => {
    const name = values.name.trim();
    if (
      projects.find(
        (project) => project.name.toLowerCase().trim() === name.toLowerCase()
      )
    ) {
      toast.error('Project already exists');
      return;
    }
    try {
      const res = await withTokenInstance.post('api-v1/projects/', values);
      toast.success(res.data.name + ' has been added successfully');
      const project: Project = {
        upid: res.data.upid,
        name: res.data.name,
      };
      dispatch(addProject(project));
    } catch (error) {
      toast.error("Couldn't add the project");
    }
    props.setModal(null);
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
                  ref={(input: HTMLInputElement) => input && input.focus()}
                  name='name'
                  component='input'
                  type='text'
                  placeholder='add a title ...'
                  required
                />
              </div>
            </form>
          )}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
