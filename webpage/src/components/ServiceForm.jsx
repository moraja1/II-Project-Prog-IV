import {useState} from "react";
import {FaRegAddressBook} from "react-icons/fa";
import InputBox from "./molecules/InputBox.jsx";
import SelectBox from "./molecules/SelectBox.jsx";

const selectOptions = [
    {
        id: 0,
        name: "Mecanica"
    },
    {
        id: 1,
        name: "Construcción"
    },
    {
        id: 2,
        name: "Arquitectura"
    }
]

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
                <SelectBox name="service" label={"Seleccione el servicio"} required>
                    {selectOptions.map((opt, index) => (
                            <option key={index} value={opt.name}>{opt.name}</option>
                        )
                    )}
                </SelectBox>
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