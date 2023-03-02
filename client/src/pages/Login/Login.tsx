import React from 'react';
import styles from './Login.module.scss';
import { Field, Form } from 'react-final-form';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MAIN } from '../../router/utils';
import { useAppDispatch } from '../../app/hooks';
import { createUser } from '../../app/AuthSlice';
import { setTodos } from '../../app/TodosSlice';
import { handleLogin } from '../../service/login';

export default function Login() {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = (values: any) => {
    if (values.username !== values.username.toLowerCase()) {
      toast.error('Username must be in lowercase');
      return;
    }

    handleLogin(values, dispatch);
  };
  return (
    <div className='container'>
      <Link to={MAIN}>
        <h2 className={styles.logo}>AdvancedTodo</h2>
      </Link>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h2 className={styles.welcome}>Welcome !</h2>
            <h2>Log in to</h2>
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
            <div className={styles.password}>
              <label>Password</label>
              <Field
                name='password'
                component='input'
                type={passwordShown ? 'text' : 'password'}
                placeholder='Password'
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
