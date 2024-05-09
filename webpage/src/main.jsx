import React from 'react'
import ReactDOM from 'react-dom/client'
import { PageHeader } from "./components/molecules/Header.jsx";
import './index.css'
import MyTable from "./components/MyTable.jsx";

ReactDOM.createRoot(document.getElementById('root'))
    .render(
  <React.StrictMode>
    <PageHeader text="Facturas UNA" />
    <MyTable />
  </React.StrictMode>
)
