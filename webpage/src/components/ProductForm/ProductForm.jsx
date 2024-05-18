import {useState} from "react";
import InputBox from "./molecules/InputBox.jsx";
import {RiShoppingBag4Fill} from "react-icons/ri";

export function ProductForm() {
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
        <article className="cmp-container productForm">
            <form className="cmp-productForm" method="post" onSubmit={handleSubmit} onChange={handleOnChange}>
                <h2 className="cmp-title">Registre Productos</h2>
                <RiShoppingBag4Fill className="cmp-loginForm-icon"/>
                <InputBox name="code" label={"Codigo"}
                          inputType="text"
                          errorMessage={"Por favor, ingresa el codigo del producto"}
                          min={4}
                          required/>
                <InputBox name="name" label={"Nombre"}
                          inputType="text"
                          errorMessage={"Por favor, ingresa el nombre del producto"}
                          required/>
                <InputBox name="currency" label={"Moneda"}
                          errorMessage={"Por favor, ingresa una divisa"}
                          inputType="text"
                          min={1}
                          required/>
                <InputBox name="price" label={"Precio"}
                          errorMessage={"Por favor, ingresa el precio del producto"}
                          pattern={`^[0-9]+$`}
                          inputType="number"/>
                <InputBox name="measureUnit" label={"Unidad de medida"}
                          errorMessage={"Por favor, ingresa la unidad de medida del producto"}
                          min={1}
                          inputType="text"/>
                <input className="main-button" type="submit" value="Guardar"/>
            </form>
        </article>
    )
}