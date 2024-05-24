import {useEffect, useState} from "react";

const headersName = [
    "Nombre", "Precio por Hora", "Horas", "Subtotal", "Eliminar"
]

export function ServiceTable({ toShow, onDelete }) {
    const [services, setServices] = useState([]);
    useEffect(() => {
        setServices(toShow)
    }, [toShow]);


    return (
        <table className="cmp-table prod-table">
            <caption className="cmp-table-title">Servicios en factura</caption>
            <thead>
            <tr>
                {headersName.map((th, index) => <th key={index}>{th}</th>)}
            </tr>
            </thead>
            <tbody>
            {services.map((serv) =>
                <tr key={serv.service.id}>
                    <td>{serv.service.name}</td>
                    <td>{serv.service.priceHour}</td>
                    <td>{serv.hourAmount}</td>
                    <td>{serv.service.priceHour * serv.hourAmount}</td>
                    <td className="molecule-table-icon">
                        <div className="molecule-table-button" style={{color: "red"}}>
                            <button onClick={onDelete} value={JSON.stringify(serv)}>Eliminar</button>
                        </div>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}
