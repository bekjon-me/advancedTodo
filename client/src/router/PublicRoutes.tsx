import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Main, Profile } from "../pages";
import { MAIN, PROFILE } from "./utils";

export const publicRouter = createBrowserRouter([
  {
    path: MAIN,
    element: <Main />,
  },
  {
    path: PROFILE,
    element: <Profile />,
  },
]);

