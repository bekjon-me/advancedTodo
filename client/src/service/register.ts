import { toast } from 'react-toastify';
import { nonTokenInstance } from '../axios/axios';
import { setIsloading } from '../app/AuthSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const handleRegister = (values: any, dispatch: Dispatch) => {
  dispatch(setIsloading(true));
  nonTokenInstance
    .post('api/auth/registration/', values)
    .then((res) => {
      console.log(res.data);
      const tokens = {
        access: res.data.access_token,
        refresh: res.data.refresh_token,
      };
      localStorage.setItem('tokens', JSON.stringify(tokens));
      toast.success('You have successfully registered');
    })
    .catch((err) => {
      console.log(err);
      if (err.response?.data.username) {
        toast.error(err.response.data.username[0]);
      }
      if (err.response?.data.email) {
        toast.error(err.response.data.email[0]);
      }
      if (err.response?.data.non_field_errors) {
        toast.error(err.response.data.non_field_errors[0]);
      }
    });
  dispatch(setIsloading(false));
};
