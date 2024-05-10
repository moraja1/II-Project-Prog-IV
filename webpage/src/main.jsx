import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PageHeader} from "./components/molecules/Header.jsx";
import ErrorPage from "./components/error-page.jsx";
import {LoginForm} from "./components/LoginForm.jsx";
import {RegisterForm} from "./components/RegisterForm.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageHeader />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <LoginForm />,
            },
            {
                path: "register",
                element: <RegisterForm />,
            },
        ],
    },

]);

ReactDOM.createRoot(document.getElementById('root'))
    .render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
