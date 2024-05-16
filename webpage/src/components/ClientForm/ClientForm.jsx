import {FORMS} from "../../services/Constants.js";
import { ImProfile } from "react-icons/im";
import InputBox from "../molecules/InputBox.jsx";

export function ClientForm(  ) {

    return (
        <article className="cmp-container registerForm">
            <form name={FORMS.REGISTER} className="cmp-registerForm" method="post" onSubmit={handleSubmit} >
                <h2 className="cmp-title">Perfil de Usuario</h2>
                <ImProfile className="cmp-loginForm-icon"/>
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
                          inputType="text"
                          required/>
                <InputBox name="mobile" label={"Teléfono"}
                          errorMessage={"Por favor, ingresa tu teléfono. Debe ser nu número de 8 digitos"}
                          inputType="text"
                          pattern={`^\\d{8}$`}/>
                <InputBox name="email" label={"Correo Electrónico"}
                          errorMessage={"Por favor, ingresa tu correo electrónico"}
                          inputType="text"
                          pattern={`^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$`}
                          required/>
                <input className="main-button" type="submit" value="Guardar"/>
            </form>
        </article>
    )
}