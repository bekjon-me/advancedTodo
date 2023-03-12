import { toast } from 'react-toastify';
import { withTokenInstance, nonTokenInstance } from '../axios/axios';
import { createUser, setIsloading } from '../app/AuthSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { setProjects } from '../app/TodosSlice';

export const handleLogin = (values: any, dispatch: Dispatch) => {
  const data = {
    todos: [],
    projects: [],
  };

  dispatch(setIsloading(true));

  nonTokenInstance
    .post('api/auth/login/', values)
    .then((res) => {
      const tokens = {
        access: res.data.access_token,
        refresh: res.data.refresh_token,
      };

      withTokenInstance
        .get('api-v1/projects/')
        .then((res) => {
          dispatch(setProjects(res.data));
        })
        .catch((err) => {
          console.log(err);
        });

      localStorage.setItem('tokens', JSON.stringify(tokens));
      dispatch(createUser(res.data.user));
      toast.success('You have successfully logged in');
    })
    .catch((err) => {
      console.log(err);
      if (err.response?.data.email) {
        toast.error(err.response.data.email[0]);
      }
      if (err.response?.data.password) {
        toast.error(err.response.data.password[0]);
      }
      if (err.response?.data.non_field_errors) {
        toast.error(err.response.data.non_field_errors[0]);
      }
    });

  dispatch(setIsloading(false));
};
