import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import AuthProvider from "./AuthProvider.jsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./services/RoutesRender.jsx";

ReactDOM.createRoot(document.getElementById('root'))
    .render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
)
