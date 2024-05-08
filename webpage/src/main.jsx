import React from 'react'
import ReactDOM from 'react-dom/client'
import { PageHeader } from "./components/molecules/Header.jsx";
import './index.css'
import MenuButton from "./components/molecules/MenuButton.jsx";
import { FaHome } from "react-icons/fa";


const image = (<FaHome />)

ReactDOM.createRoot(document.getElementById('root'))
    .render(
  <React.StrictMode>
    <PageHeader text="Facturas UNA" />
      <MenuButton text="Home" image={image}/>
  </React.StrictMode>
)
