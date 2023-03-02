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

export default function Modal(props: IProps) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const onSubmit = (values: any) => {
    if (activeTags.length === 0) {
      toast.warning('Please select at least one tag');
      // return;
    }

    console.log(values, activeTags);
  };

  const handleAddTag = (tagName: string) => {
    if (activeTags.includes(tagName)) {
      setActiveTags(activeTags.filter((tag) => tag !== tagName));
    } else {
      setActiveTags([...activeTags, tagName]);
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
                <label>Tags</label>
                <div className={styles.tags}>
                  {staticData.map((tag: any) => (
                    <Tag
                      key={tag.id}
                      name={tag.name}
                      color={tag.color}
                      className={
                        activeTags.includes(tag.name) ? 'selected' : ''
                      }
                      onClick={() => handleAddTag(tag.name)}
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
