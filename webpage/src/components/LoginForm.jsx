import './components.css';
import { FaRegUserCircle } from "react-icons/fa";
import {InputBox} from "./molecules/InputBox.jsx";
import {Form, Link} from "react-router-dom";

export function LoginForm() {
    return (
        <article className="cmp-container loginForm">
            <Form className="cmp-loginForm" method="get"  >
                <h2 className="cmp-title">Iniciar Sesión</h2>
                <FaRegUserCircle className="cmp-loginForm-icon"/>
                <InputBox field="Usuario" isRequiredProp={true} inputType="text"/>
                <InputBox field="Contraseña" isRequiredProp={true} inputType="password"/>
                <input className="main-button" type="submit" value="Iniciar Sesion"/>
            </Form>
            <p className="cmp-loginForm-forgotPass">Olvidaste la contraseña? <Link to="/">Recuperar Contraseña</Link></p>
            <p className="cmp-loginForm-register">No tienes una cuenta? <Link to="/register">Registrate</Link></p>
        </article>
    )
}