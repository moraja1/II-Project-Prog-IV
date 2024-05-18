import InputBox from "../molecules/InputBox.jsx";
import {RiShoppingBag4Fill} from "react-icons/ri";
import SelectBox from "../molecules/SelectBox.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import API from "../../services/GeneralApi.js";
import {ProductFormAnimation} from "../skeletons/FormAnimation.jsx";
import ErrorPage from "../error-page.jsx";
import {ModalMsg} from "../Modal/ModalMessage.jsx";
import {useContext, useState} from "react";
import {HttpStatusCode} from "axios";
import {AuthContext} from "../../services/Auth/AuthProvider.jsx";

export function ProductForm() {
    const {user} = useContext(AuthContext);
    const [activateModal, setActivateModal] = useState(false);
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['measureUnits'],
        queryFn: () =>
            API.get(`/measures`)
                .then((res) => res.data),
    })
    const mutation = useMutation({
        mutationFn: (product) =>
            API.post('/product', product)
                .then((res) => {
                    if(res.status === HttpStatusCode.Ok) setActivateModal(true);
                }),
    })
    const handleSubmit = (e) => {
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);
        const measureUnit = JSON.parse(payload.measureUnit);
        let product = {
            supplierId: user.id,
            ...payload,
            measureUnit: measureUnit,
        };
        mutation.mutate(product);
        e.preventDefault();
    }
    const modalRead = () => setActivateModal(false);

    if(isPending || isFetching) return <ProductFormAnimation />
    if(error) return <article className="cmp-container productForm"><ErrorPage /></article>

    return (
        <>
            <ModalMsg message={"Producto agregado correctamente"} activate={activateModal} modalRead={modalRead}/>
            <article className="cmp-container productForm">
                <form className="cmp-productForm" onSubmit={handleSubmit}>
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
                    <SelectBox name="measureUnit" label={"Seleccione la unidad de medida"} required>
                        {data.map((opt, index) => (
                                <option key={index} value={JSON.stringify(opt)}>{`${opt.symbol} - ${opt.name}`}</option>
                            )
                        )}
                    </SelectBox>
                    <InputBox name="price" label={"Precio"}
                              errorMessage={"Por favor, ingresa el precio del producto"}
                              pattern={`^[0-9]+$`}
                              inputType="number"/>
                    <input className="main-button" type="submit" value="Guardar"/>
                </form>
            </article>
        </>
    )
}