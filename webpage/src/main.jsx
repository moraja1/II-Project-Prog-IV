import React from 'react'
import ReactDOM from 'react-dom/client'
import { PageHeader } from "./components/molecules/Header.jsx";
import './index.css'
import MyMenu from "./components/MyMenu.jsx";

ReactDOM.createRoot(document.getElementById('root'))
    .render(
  <React.StrictMode>
    <PageHeader text="Facturas UNA" />
    <MyMenu role="Admin" />
  </React.StrictMode>
)
