import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/mainpages/Home";
import Login from "./pages/authpages/Login";
import SignUp from "./pages/authpages/SignUp";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
const Layout = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default Layout;
