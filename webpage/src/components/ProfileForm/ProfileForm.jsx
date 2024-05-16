import {useContext} from "react";
import { ImProfile } from "react-icons/im";
import InputBox from "./molecules/InputBox.jsx";
import {AuthContext} from "../services/AuthProvider.jsx";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export function ProfileForm() {
    const {user, setUser} = useContext(AuthContext);
    const profileMutation = useMutation({
        mutationKey: ['profileMutation'],
        mutationFn: () =>{
            axios
                .patch(`${usersUrl}/${user.id}`, user)
                .then(res => {
                    let usersChanged = users.map(u => u.id === user.id ? user : u);
                    setUsers(usersChanged);
                    return res.data;
                })
        }
    })

    const handleOnChange = (evt) => {
        evt.preventDefault();
        setUser({...user, [evt.target.name]: evt.target.value});
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
                <h2 className="cmp-title">Perfil de Usuario</h2>
                <ImProfile className="cmp-loginForm-icon"/>
                <InputBox name="naturalId" label={"Cedula"}
                          inputType="text"
                          defaultValue={user.naturalId}
                          errorMessage={"Por favor, ingresa un cedula válida de 9 dígitos"}
                          pattern={`^\\d+$`}/>
                <InputBox name="name" label={"Nombre"}
                          inputType="text"
                          defaultValue={user.name}
                          errorMessage={"Por favor, ingresa tu nombre"}/>
                <InputBox name="lastName" label={"Apellidos"}
                          errorMessage={"Por favor, ingresa tus apellidos"}
                          inputType="text"
                          defaultValue={user.lastName}/>
                <InputBox name="mobile" label={"Teléfono"}
                          errorMessage={"Debe ser nu número de 8 digitos y no puede contener letras"}
                          inputType="text"
                          pattern={`^\\d{8}$`}
                          defaultValue={user.mobile}/>
                <InputBox name="email" label={"Correo Electrónico"}
                          errorMessage={"Por favor, ingresa un correo electrónico válido"}
                          inputType="text"
                          pattern={`^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$`}
                          defaultValue={user.email}/>
                <InputBox name="password" label={"Contraseña"}
                          errorMessage={"Por favor, ingresa una contraseña"}
                          inputType="password"/>
                <input className="main-button" type="submit" value="Actualizar"/>
            </form>
        </article>
    )
}