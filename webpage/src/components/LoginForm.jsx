import './components.css';
import { FaRegUserCircle } from "react-icons/fa";
import {InputBox} from "./molecules/InputBox.jsx";

export function LoginForm() {
    return (
        <article className="cmp-container loginForm">
            <form className="cmp-loginForm" method="get" action="/login" >
                <h2 className="cmp-title">Iniciar Sesión</h2>
                <FaRegUserCircle className="cmp-loginForm-icon"/>
                <InputBox field="Username" isRequiredProp={true} inputType="text"/>
                <InputBox field="Password" isRequiredProp={true} inputType="password"/>
                <input className="main-button" type="submit" value="Iniciar Sesion"/>
            </form>
            <p className="cmp-loginForm-forgotPass">Olvidaste la contraseña? <a href="">Recuperar Contraseña</a></p>
            <p className="cmp-loginForm-register">No tienes una cuenta? <a href="">Registrate</a></p>
        </article>
    )
}