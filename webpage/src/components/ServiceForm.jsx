import {useState} from "react";
import {FORMS} from "../services/Constants.js";
import {FaRegAddressBook} from "react-icons/fa";
import InputBox from "./molecules/InputBox.jsx";

export function ServiceForm() {
    const [values, setValues] = useState({
        code: "",
        name: "",
        currency: "",
        price: "",
        measureUnit: "",
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
        <article className="cmp-container serviceForm">
            <form className="cmp-serviceForm" method="post" onSubmit={handleSubmit} onChange={handleOnChange}>
                <h2 className="cmp-title">Registre Servicios</h2>
                <FaRegAddressBook className="cmp-loginForm-icon"/>
                <InputBox name="name" label={"Nombre"}
                          inputType="text"
                          errorMessage={"Por favor, ingresa el nombre del servicio"}
                          min={4}
                          required/>
                <select name="name" required>
                    {/*OPTIONS*/}
                </select>
                <InputBox name="currency" label={"Moneda"}
                          errorMessage={"Por favor, ingresa una divisa"}
                          inputType="text"
                          min={1}
                          required/>
                <InputBox name="price" label={"Precio por hora"}
                          errorMessage={"Por favor, ingresa el precio por hora del servicio"}
                          pattern={`^[0-9]+$`}
                          inputType="number"/>
                <input className="main-button" type="submit" value="Guardar"/>
            </form>
        </article>
    )
}