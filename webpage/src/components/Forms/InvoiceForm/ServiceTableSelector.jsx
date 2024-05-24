import SelectBox from "../../molecules/SelectBox.jsx";
import InputBox from "../../molecules/InputBox.jsx";
import {useEffect, useState} from "react";
import {ServiceTable} from "./ServiceTable.jsx";

export function ServiceTableSelector({ isActive, availableServices, selectedServices, onServiceSelected, onServiceDeleted }) {
    const [services, setServices] = useState(availableServices);
    const [selectedService, setSelectedService] = useState({});
    const [hourAmount, setHourAmount] = useState(1);
    useEffect(() => {
        setServices(availableServices);
        setSelectedService(availableServices[0]);
    }, [availableServices]);

    const handleChangeSelector = (e) => {
        setSelectedService(JSON.parse(e.target.value));
    }

    const handleChangeHourAmount = (e) => {
        setHourAmount(e.target.value);
    }

    const handleAddServices = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let payload = {
            service: selectedService,
            hourAmount: hourAmount
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
                    <div className={"cmp-invoiceForm-products"}>
                        <SelectBox name="service" label={"Seleccione un servicio"} onChange={handleChangeSelector} required>
                            {services.map((serv) => <option key={serv.id} value={JSON.stringify(serv)}>
                                {`${serv.name} - Precio por hora: ${serv.priceHour}`}
                            </option>)}
                        </SelectBox>
                        <div className={"cmp-invoiceForm-autoFit"}>
                            <InputBox name="hourAmount" label={"Cantidad de horas"} onChange={handleChangeHourAmount}
                                      inputType="number"
                                      min={1}
                                      defaultValue={1}
                                      required/>
                            <button type={"button"} className="cmp-invoiceForm-button" onClick={handleAddServices}>Agregar</button>
                        </div>
                    </div>
                <ServiceTable toShow={selectedServices} onDelete={handleDelete} />
            </>}
        </>)
}