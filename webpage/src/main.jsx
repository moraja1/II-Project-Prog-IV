import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import AuthProvider from "./services/Auth/AuthProvider.jsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./services/Auth/RoutesRender.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root'))
    .render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient} >
          <AuthProvider>
              <RouterProvider router={router} />
          </AuthProvider>
      </QueryClientProvider>
  </React.StrictMode>
)
