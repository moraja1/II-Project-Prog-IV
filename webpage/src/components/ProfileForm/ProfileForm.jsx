import { ImProfile } from "react-icons/im";
import InputBox from "../molecules/InputBox.jsx";
import {useProfileForm} from "./ProfileFormHooks.js";
import Modal from '@mui/material/Modal';
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: "white",
    border: '2px solid #fff',
    boxShadow: 24,
    borderRadius: '25px',
    p: 4,
    textAlign: "center"
};

export function ProfileForm() {
    const {user, handleSubmit, isError,
        isSuccess, handleModalRead} = useProfileForm();

    return (
        <>
            <div>
                <Modal open={isError} onClose={handleModalRead} aria-labelledby="cmp-title">
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            No se pudo actualizar el perfil
                        </Typography>
                    </Box>
                </Modal>
                <Modal open={isSuccess} onClose={handleModalRead} aria-labelledby="cmp-title">
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Perfil actualizado correctamente
                        </Typography>
                    </Box>
                </Modal>
                <article className="cmp-container registerForm">
                    <form className="cmp-registerForm" onSubmit={handleSubmit} >
                        <h2 className="cmp-title">Perfil de Usuario</h2>
                        <ImProfile className="cmp-loginForm-icon"/>
                        <InputBox name="naturalId" label={"Cedula"}
                                  inputType="text"
                                  defaultValue={user.naturalId}
                                  errorMessage={"Por favor, ingresa un cedula válida de 9 dígitos"}
                                  pattern={`^\\d+$`}
                                  disabled/>
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
            </div>
        </>
    )
}