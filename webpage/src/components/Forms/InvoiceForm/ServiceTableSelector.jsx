import SelectBox from "../../molecules/SelectBox.jsx";
import InputBox from "../../molecules/InputBox.jsx";
import {useEffect, useState} from "react";
import {ServiceTable} from "./ServiceTable.jsx";

export function ServiceTableSelector({ isActive, availableServices, selectedServices, onServiceSelected, onServiceDeleted }) {
    const [services, setServices] = useState(availableServices);
    useEffect(() => {
        setServices(availableServices)
    }, [availableServices]);
    const handleAddServices = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        let payload = Object.fromEntries(formData);
        payload = {
            ...payload,
            service: JSON.parse(payload.service),
        }
        onServiceSelected(payload);
    }
    const handleDelete = (e) => {
        const prodToDelete = JSON.parse(e.target.value);
        onServiceDeleted(prodToDelete);
    }
    return (
        <>
            {isActive && <>
                <form id={"cmp-invoiceForm-2"} onSubmit={handleAddServices}>
                    <div className={"cmp-invoiceForm-products"}>
                        <SelectBox name="service" label={"Seleccione un servicio"} required>
                            {services.map((serv) => <option key={serv.id} value={JSON.stringify(serv)}>
                                {`${serv.name} - Precio por hora: ${serv.priceHour}`}
                            </option>)}
                        </SelectBox>
                        <div className={"cmp-invoiceForm-autoFit"}>
                            <InputBox name="hourAmount" label={"Cantidad de horas"}
                                      inputType="number"
                                      min={1}
                                      defaultValue={1}
                                      required/>
                            <input type={"submit"} value={"Agregar"} className="cmp-invoiceForm-button"/>
                        </div>
                    </div>
                </form>
                <ServiceTable toShow={selectedServices} onDelete={handleDelete} />
            </>}
        </>)
}