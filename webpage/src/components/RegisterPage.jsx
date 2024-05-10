import './components.css';
import { FaRegAddressBook } from "react-icons/fa";
import {InputBox} from "./molecules/InputBox.jsx";
import {Link} from "react-router-dom";

export function RegisterForm() {
  return (
      <article className="cmp-container registerForm">
          <form className="cmp-registerForm" method="post" action="/login">
              <h2 className="cmp-title">Registrese</h2>
              <FaRegAddressBook className="cmp-loginForm-icon"/>
              <InputBox field="Usuario" isRequiredProp={true} inputType="text"/>
              <InputBox field="Nombre" isRequiredProp={true} inputType="text"/>
              <InputBox field="Apellidos" isRequiredProp={true} inputType="text"/>
              <InputBox field="Contraseña" isRequiredProp={true} inputType="password"/>
              <InputBox field="Confirmar Contraseña" isRequiredProp={true} inputType="password"/>
              <input className="main-button" type="submit" value="Registrarme"/>
          </form>
          <p>Ir a <Link to="/">Iniciar Sesión</Link></p>
      </article>
  )
}
