import React, { useEffect } from 'react';
import './assets/main.scss';
import { withTokenInstance } from './axios/axios';
import AppRouter from './router/AppRouter';
import { AUTH_USER_URL } from './utils/urls';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './app/hooks';
import { createUser, setIsloading } from './app/AuthSlice';
import { useAuth } from './hooks/UseAuth';
import Loader from './components/Loader/Loader';
import { addProject, setProjects } from './app/TodosSlice';

function App() {
  const { isLoading } = useAuth();
  const dispatch = useAppDispatch();
  async function getUser() {
    dispatch(setIsloading(true));
    try {
      const response = await withTokenInstance.get(AUTH_USER_URL);
      const projects = await withTokenInstance.get('api-v1/projects/');
      const data = response.data;
      dispatch(createUser(data));
      dispatch(setProjects(projects.data));
    } catch (error) {
      console.log(error);
    }
    dispatch(setIsloading(false));
  }

  useEffect(() => {
    getUser();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
