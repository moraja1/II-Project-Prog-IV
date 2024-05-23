import '../../../styles/components.css';
import { FaRegUserCircle } from "react-icons/fa";
import InputBox from "../../molecules/InputBox.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../services/Auth/AuthProvider.jsx";
import {authAPI} from '../../../services/Api.js'
import {useMutation} from "@tanstack/react-query";
import {HttpStatusCode} from "axios";
import {ModalMsg} from "../../Modal/ModalMessage.jsx";

export function LoginForm() {
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: (payload) =>
            authAPI.post('/login', payload)
                .then((res) => {
                    if(res.status === HttpStatusCode.Ok) {
                        localStorage.setItem("user", JSON.stringify(res.data));
                        setUser(res.data);
                        navigate('/home', { replace: true });
                    }
                })
                .catch(() => setActivateFailedModal(true))
    })
    const [activateFailedModal, setActivateFailedModal] = useState(false);
    useEffect(() => {
        localStorage.clear()
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const payload = Object.fromEntries(formData);
        mutation.mutate(payload);
    }

    const modalRead = () => {
        if(activateFailedModal) setActivateFailedModal(false);
    }

    return (
        <>
            <ModalMsg
                message={"Cédula o contraseña incorrectos. Vuelva a intentarlo"}
                activate={activateFailedModal} modalRead={modalRead}/>
            <article className="cmp-container loginForm">
                <form className="cmp-loginForm" method="post" onSubmit={handleSubmit}>
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
                    <input className="main-button" type="submit" value="Login"/>
                </form>
                <p className="cmp-loginForm-forgotPass">Olvidaste la contraseña? <Link to="/">Recuperar
                    Contraseña</Link></p>
                <p className="cmp-loginForm-register">No tienes una cuenta? <Link to="/register">Registrate</Link></p>
            </article>
        </>
    )
}