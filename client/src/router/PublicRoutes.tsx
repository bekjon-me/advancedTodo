import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Main, Profile } from '../pages';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import { MAIN, LOGIN, REGISTER } from './utils';

export const publicRouter = createBrowserRouter([
  {
    path: MAIN,
    element: <Main />,
  },
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
  {
    path: '*',
    element: <Login />,
  },
]);
