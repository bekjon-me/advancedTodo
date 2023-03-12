import React from "react";
import { RouterProvider } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { privateRouter } from "./PrivateRoutes";
import { publicRouter } from "./PublicRoutes";

export default function AppRouter() {
  const { isUser } = useAuth();

  return isUser ? (
    <RouterProvider router={privateRouter} />
  ) : (
    <RouterProvider router={publicRouter} />
  );
}
