import React from "react";
import { RouterProvider } from "react-router-dom";
import { privateRouter } from "./PrivateRoutes";
import { publicRouter } from "./PublicRoutes";

export default function AppRouter() {
  let isUser = true;
  return isUser ? (
    <RouterProvider router={privateRouter} />
  ) : (
    <RouterProvider router={publicRouter} />
  );
}
