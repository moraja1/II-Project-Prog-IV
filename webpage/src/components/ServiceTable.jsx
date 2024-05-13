export const ServiceTable = (props) => {
    const { services } = props;

    let headersName = [
        "Codigo", "Nombre", "Moneda", "Precio por Hora"
    ]

    let rows;

    if(services !== undefined ) {
        rows = services.map((s) =>
            <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.currency}</td>
                <td>{s.priceHour}</td>
            </tr>
        );
    }


    return (
        <table className="cmp-table">
            <caption className="cmp-table-title">Productos en factura</caption>
            <thead>
            <tr>
                <th>{headersName[0]}</th>
                <th>{headersName[1]}</th>
                <th>{headersName[2]}</th>
                <th>{headersName[3]}</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    )
}
