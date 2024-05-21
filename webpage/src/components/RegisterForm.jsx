import '../styles/components.css';
import {FaRegAddressBook} from "react-icons/fa";
import InputBox from "./molecules/InputBox.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import SelectBox from "./molecules/SelectBox.jsx";
import {useMutation} from "@tanstack/react-query";
import {authAPI} from "../services/Api.js";
import {HttpStatusCode} from "axios";
import {ModalMsg} from "./Modal/ModalMessage.jsx";

const supplierTypes = [
    {
        value: "JURIDICAL",
        name: "Jurídico",
    },
    {
        value: "PHYSICAL",
        name: "Fisico"
    }
]

export function RegisterForm() {
    const [values, setValues] = useState({})
    const mutation = useMutation({
        mutationFn: (user) =>
            authAPI.post('/register', user)
                .then((res) => {
                    if(res.status === HttpStatusCode.Created) setActivateSuccessModal(true);
                    if(res.status === HttpStatusCode.BadRequest) setActivateFailedModal(true);
                })
    })
    const [activateSuccessModal, setActivateSuccessModal] = useState(false);
    const [activateFailedModal, setActivateFailedModal] = useState(false);

    const modalRead = () => {
        if(activateSuccessModal) setActivateSuccessModal(false);
        if(activateFailedModal) setActivateFailedModal(false);
    }

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
        <>
            <ModalMsg message={"Registro exitoso, debe esperar a que se le habilite el acceso por parte de la administración"}
                      activate={activateSuccessModal} modalRead={modalRead}/>
            <ModalMsg message={"Registro fallido, por favor verifique que se encuentre registrado en el Ministerio de Hacienda"}
                      activate={activateFailedModal} modalRead={modalRead}/>
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
                    <SelectBox name="type" label={"Que el tipo de persona"} required>
                        {supplierTypes.map((opt, index) => (
                                <option key={index} value={opt.value}>{opt.name}</option>
                            )
                        )}
                    </SelectBox>
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
        </>
    )
}
