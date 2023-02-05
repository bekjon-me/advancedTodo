import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Main, Profile } from "../pages";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import { MAIN, LOGIN, REGISTER } from "./utils";

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
    element: <SignUp />,
  },
  {
    path: "*",
    element: <Login />,
  },
]);
