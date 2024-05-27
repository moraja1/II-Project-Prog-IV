import {useEffect, useState} from "react";

const headersName = [
    "Codigo", "Nombre",  "Precio", "Cantidad", "Subtotal", "Eliminar"
]

export function ProductTable({ toShow, onDelete }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(toShow)
    }, [toShow]);

    return (
        <table className="cmp-table center-data">
            <caption className="cmp-table-title">Productos en factura</caption>
            <thead>
            <tr>
                {headersName.map((th, index) => <th key={index}>{th}</th>)}
            </tr>
            </thead>
            <tbody>
                {products.map((prod) =>
                    <tr key={prod.product.id}>
                        <td>{prod.product.code}</td>
                        <td>{prod.product.name}</td>
                        <td>{prod.product.price}</td>
                        <td>{prod.quantity}</td>
                        <td>{prod.product.price * prod.quantity}</td>
                        <td className="molecule-table-icon">
                            <div className="molecule-table-button" style={{color: "red"}}>
                                <button onClick={onDelete} value={JSON.stringify(prod)}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
