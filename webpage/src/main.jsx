import React from 'react'
import ReactDOM from 'react-dom/client'
import { PageHeader } from "./components/molecules/Header.jsx";
import './index.css'
import {LoginForm} from "./components/LoginForm.jsx";




ReactDOM.createRoot(document.getElementById('root'))
    .render(
  <React.StrictMode>
    <PageHeader text="Factura UNA" />
      <LoginForm />
  </React.StrictMode>
)
