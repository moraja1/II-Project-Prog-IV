import '../styles/components.css';
import { FaRegUserCircle } from "react-icons/fa";
import InputBox from "./molecules/InputBox.jsx";
import {Link} from "react-router-dom";
import {FORMS} from "../services/Constants.js";

export function LoginForm() {
    const handleSubmit = (evt) => {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const payload = Object.fromEntries(formData);

        console.log(payload);
    }

    return (
        <article className="cmp-container loginForm">
            <form className="cmp-loginForm" method="post" onSubmit={handleSubmit} >
                <h2 className="cmp-title">Iniciar Sesión</h2>
                <FaRegUserCircle className="cmp-loginForm-icon"/>
                <InputBox name="naturalId" label={"Cedula"}
                          inputType="text"
                          errorMessage={"Por favor, ingresa un cedula válida de 9 dígitos"}
                          pattern={`^\\d+$`}
                          required/>
                <InputBox name="password" label={"Contraseña"}
                          inputType="password"
                          errorMessage={"Por favor, ingresa tu contraseña"}
                          required/>
                <input className="main-button" type="submit" value="Iniciar Sesion" />
            </form>
            <p className="cmp-loginForm-forgotPass">Olvidaste la contraseña? <Link to="/">Recuperar Contraseña</Link></p>
            <p className="cmp-loginForm-register">No tienes una cuenta? <Link to="/register">Registrate</Link></p>
        </article>
    )
}