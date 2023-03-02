import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import Tag from '../Tag/Tag';
import styles from './Modal.module.scss';
import { toast, ToastContainer } from 'react-toastify';

let staticData: any = [
  {
    id: 1,
    name: 'Work',
    color: '#B2AFA1',
  },
  {
    id: 2,
    name: 'Home',
    color: '#D1E5F7',
  },
  {
    id: 3,
    name: 'Study',
    color: '#FFCECE',
  },
  {
    id: 4,
    name: 'University',
    color: '#D2CEFF',
  },
];

interface IProps {
  setModal: (modal: null | string) => void;
}

export default function AddProjectModal(props: IProps) {
  const onSubmit = (values: any) => {
    console.log(values);
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
              <div className={styles.input + ' ' + styles.color}>
                <label>Color</label>
                <Field
                  defaultValue='#000000'
                  name='color'
                  component='input'
                  type='color'
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
