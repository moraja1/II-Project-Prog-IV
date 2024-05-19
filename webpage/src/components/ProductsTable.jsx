export const ProductsTable = (props) => {
    const { products } = props;

    let headersName = [
        "Codigo", "Nombre", "Cantidad", "Precio"
    ]

    let rows;

    if(products !== undefined ) {
        rows = products.map((p) =>
            <tr key={p.id}>
                <td>{p.code}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
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
