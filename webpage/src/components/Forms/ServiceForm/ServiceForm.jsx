import {useContext, useState} from "react";
import {FaRegAddressBook} from "react-icons/fa";
import InputBox from "../../molecules/InputBox.jsx";
import SelectBox from "../../molecules/SelectBox.jsx";
import {AuthContext} from "../../../services/Auth/AuthProvider.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import API from "../../../services/GeneralApi.js";
import axios, {HttpStatusCode} from "axios";
import {ProductFormAnimation} from "../../skeletons/FormAnimation.jsx";
import ErrorPage from "../../error-page.jsx";
import {ModalMsg} from "../../Modal/ModalMessage.jsx";

export function ServiceForm() {
    const {user} = useContext(AuthContext);
    const [activateModal, setActivateModal] = useState(false);
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['servicesCabys'],
        queryFn: () =>
            axios.get(`http://localhost:8081/cabys/api/services`)
                .then((res) => res.data),
    })
    const mutation = useMutation({
        mutationFn: (service) =>
            API.post('/service', service)
                .then((res) => {
                    if(res.status === HttpStatusCode.Ok) setActivateModal(true);
                }),
    })
    const handleSubmit = (e) => {
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);
        let service = {
            supplierId: user.id,
            ...payload
        }
        mutation.mutate(service);
        e.preventDefault();
    }
    const modalRead = () => setActivateModal(false);

    if(isPending || isFetching) return <ProductFormAnimation />
    if(error) return <article className="cmp-container productForm"><ErrorPage /></article>

    return (
        <>
            <ModalMsg message={"Servicio agregado correctamente"} activate={activateModal} modalRead={modalRead}/>
            <article className="cmp-container serviceForm">
                <form className="cmp-serviceForm" onSubmit={handleSubmit}>
                    <h2 className="cmp-title">Registre Servicios</h2>
                    <FaRegAddressBook className="cmp-loginForm-icon"/>
                    <SelectBox name="name" label={"Seleccione el servicio"} required>
                        {data.map((opt) => (
                                <option key={opt.id} value={opt.name}>{opt.name}</option>
                            )
                        )}
                    </SelectBox>
                    <InputBox name="price" label={"Precio por hora"}
                              errorMessage={"Por favor, ingresa el precio por hora del servicio"}
                              pattern={`^[0-9]+$`}
                              inputType="number"/>
                    <input className="main-button" type="submit" value="Guardar"/>
                </form>
            </article>
        </>
    )
}