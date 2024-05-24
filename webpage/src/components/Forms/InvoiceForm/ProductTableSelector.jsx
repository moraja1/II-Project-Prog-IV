import SelectBox from "../../molecules/SelectBox.jsx";
import InputBox from "../../molecules/InputBox.jsx";
import {ProductTable} from "./ProductTable.jsx";
import {useEffect, useState} from "react";

export function ProductTableSelector({ isActive, availableProducts, selectedProducts, onProductSelected, onProductDeleted }) {
    const [products, setProducts] = useState(availableProducts);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        setProducts(availableProducts);
        setSelectedProduct(availableProducts[0])
    }, [availableProducts]);

    const handleChangeSelector = (e) => {
        setSelectedProduct(JSON.parse(e.target.value));
    }
    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let payload = {
            product: selectedProduct,
            quantity: quantity
        }

        onProductSelected(payload);
    }
    const handleDelete = (e) => {
        const prodToDelete = JSON.parse(e.target.value);
        onProductDeleted(prodToDelete);
    }
    return (
        <>
            {isActive && <>
                <div className={"cmp-invoiceForm-products"}>
                    <SelectBox name="product" label={"Seleccione un producto"} onChange={handleChangeSelector} required>
                        {products.map((prod) => <option key={prod.id} value={JSON.stringify(prod)}>
                            {`${prod.name} - Precio: ${prod.price} por ${prod.idMeasureUnits.name}`}
                        </option>)}
                    </SelectBox>
                    <div className={"cmp-invoiceForm-autoFit"}>
                        <InputBox name="quantity" label={"Cantidad"} onChange={handleChangeQuantity}
                                  inputType="number"
                                  min={1}
                                  defaultValue={1}
                                  required/>
                        <button type={"button"} className="cmp-invoiceForm-button" onClick={handleAddProduct} >Agregar</button>
                    </div>
                </div>
                <ProductTable toShow={selectedProducts} onDelete={handleDelete} />
            </>}
        </>
    )
}