import {useState} from "react";
import {FORMS} from "../services/Constants.js";
import { ImProfile } from "react-icons/im";
import InputBox from "./molecules/InputBox.jsx";
import {Link} from "react-router-dom";

export function ProfileForm( props ) {
    const { user } = props;
    const [values, setValues] = useState({
        lastName: user.lastName,
        name: user.name,
        naturalId: user.naturalId,
        mobile: user.mobile,
        email: user.email,
        password: user.password,
        passwordConf: ""
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
            <form name={FORMS.REGISTER} className="cmp-registerForm" method="post" onSubmit={handleSubmit} onChange={handleOnChange}>
                <h2 className="cmp-title">Perfil de Usuario</h2>
                <ImProfile className="cmp-loginForm-icon"/>
                <InputBox name="naturalId" label={"Cedula"}
                          inputType="text"
                          defaultValue={values.naturalId}
                          errorMessage={"Por favor, ingresa un cedula válida de 9 dígitos"}
                          pattern={`^\\d+$`}
                          required/>
                <InputBox name="name" label={"Nombre"}
                          inputType="text"
                          defaultValue={values.name}
                          errorMessage={"Por favor, ingresa tu nombre"}
                          required/>
                <InputBox name="lastName" label={"Apellidos"}
                          errorMessage={"Por favor, ingresa tus apellidos"}
                          inputType="text"
                          defaultValue={values.lastName}/>
                <InputBox name="mobile" label={"Teléfono"}
                          errorMessage={"Por favor, ingresa tu teléfono. Debe ser nu número de 8 digitos"}
                          inputType="text"
                          pattern={`^\\d{8}$`}
                          defaultValue={values.mobile}/>
                <InputBox name="email" label={"Correo Electrónico"}
                          errorMessage={"Por favor, ingresa tu correo electrónico"}
                          inputType="text"
                          pattern={`^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$`}
                          defaultValue={values.email}/>
                <InputBox name="password" label={"Contraseña"}
                          errorMessage={"Por favor, ingresa una contraseña"}
                          inputType="password"/>
                <InputBox name="passwordConf" label={"Confirmar Contraseña"}
                          errorMessage={"Las contraseñas no coinciden"}
                          pattern={values.password}
                          inputType="password"/>
                <input className="main-button" type="submit" value="Actualizar"/>
            </form>
        </article>
    )
}