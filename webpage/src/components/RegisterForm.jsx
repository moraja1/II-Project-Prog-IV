import '../styles/components.css';
import {FaRegAddressBook} from "react-icons/fa";
import InputBox from "./molecules/InputBox.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import {FORMS} from "../services/Constants.js";

export function RegisterForm() {
    const [values, setValues] = useState({
        naturalId: "",
        password: "",
        name: "",
        lastName: "",
        mobile: "",
        email: "",
    })

    const handleOnChange = (evt) => {
        evt.preventDefault();

        setValues({...values, [evt.target.name]: evt.target.value});
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();


        const formData = new FormData(evt.target);
        const payload = Object.fromEntries(formData);

        console.log(payload);
    }

    return (
        <article className="cmp-container registerForm">
            <form className="cmp-registerForm" method="post" onSubmit={handleSubmit} onChange={handleOnChange}>
                <h2 className="cmp-title">Registrese</h2>
                <FaRegAddressBook className="cmp-loginForm-icon"/>
                <InputBox name="naturalId" label={"Cedula"}
                          inputType="text"
                          errorMessage={"Por favor, ingresa un cedula válida de 9 dígitos"}
                          pattern={`^\\d+$`}
                          required/>
                <InputBox name="name" label={"Nombre"}
                          inputType="text"
                          errorMessage={"Por favor, ingresa tu nombre"}
                          required/>
                <InputBox name="lastName" label={"Apellidos"}
                          errorMessage={"Por favor, ingresa tus apellidos"}
                          inputType="text"/>
                <InputBox name="password" label={"Contraseña"}
                          errorMessage={"Por favor, ingresa una contraseña"}
                          inputType="password"/>
                <InputBox name="passwordConf" label={"Confirmar Contraseña"}
                          errorMessage={"Las contraseñas no coinciden"}
                          pattern={values.password}
                          inputType="password"/>
                <input className="main-button" type="submit" value="Registrarme"/>
            </form>
            <p>Ir a <Link to="/">Iniciar Sesión</Link></p>
        </article>
    )
}
