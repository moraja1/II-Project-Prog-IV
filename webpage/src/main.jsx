import React from 'react'
import ReactDOM from 'react-dom/client'
import { PageHeader } from "./components/common/header.jsx";
import './index.css'




ReactDOM.createRoot(document.getElementById('root'))
    .render(
  <React.StrictMode>
    <PageHeader text="Factura UNA" />
  </React.StrictMode>
)
