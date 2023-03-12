import React from 'react';
import styles from './Register.module.scss';
import { Field, Form } from 'react-final-form';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { nonTokenInstance } from '../../axios/axios';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import { setIsloading } from '../../app/AuthSlice';
import { handleRegister } from '../../service/register';

export default function Login() {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = (values: any) => {
    if (values.password1 !== values.password2) {
      toast.error('Passwords do not match');
      return;
    }

    handleRegister(values, dispatch);
  };
  return (
    <div className='container'>
      <h2 className={styles.logo}>AdvancedTodo</h2>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h2 className={styles.welcome}>Welcome !</h2>
            <h2>Register </h2>
            <p className={styles.titleP}>your account</p>
            <div className={styles.email}>
              <label>Username</label>
              <Field
                name='username'
                component='input'
                type='text'
                placeholder='Username'
              />
            </div>
            <div className={styles.email}>
              <label>Email</label>
              <Field
                name='email'
                component='input'
                type='email'
                placeholder='Email'
              />
            </div>
            <div className={styles.password}>
              <label>Password</label>
              <Field
                name='password1'
                component='input'
                type={passwordShown ? 'text' : 'password'}
                placeholder='Repeat password'
              />
            </div>
            <div className={styles.password}>
              <label>Password</label>
              <Field
                name='password2'
                component='input'
                type={passwordShown ? 'text' : 'password'}
                placeholder='Repeat password'
              />
              <span>
                {passwordShown ? (
                  <BiHide onClick={() => setPasswordShown(!passwordShown)} />
                ) : (
                  <BiShow onClick={() => setPasswordShown(!passwordShown)} />
                )}
              </span>
            </div>
            <div className={styles.remember}>
              <div className={styles.rememberMe}>
                <Field name='rememberMe' component='input' type='checkbox' />
                <label>Remember me</label>
              </div>
              <div className={styles.forgotPassword}>
                <a href='#'>Forgot password ?</a>
              </div>
            </div>

            <button type='submit'>Submit</button>

            <div className={styles.signUp}>
              <p>Don't have an account?</p>
              <Link to='/register'>Register</Link>
            </div>
          </form>
        )}
      />
    </div>
  );
}
