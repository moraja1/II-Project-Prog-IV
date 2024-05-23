import SelectBox from "../../molecules/SelectBox.jsx";
import InputBox from "../../molecules/InputBox.jsx";
import {ProductTable} from "../../ProductTable.jsx";
import {useEffect, useState} from "react";

export function ProductTableSelector({ isActive, availableProducts }) {
    const [products, setProducts] = useState(availableProducts);
    useEffect(() => {
        setProducts(availableProducts)
    }, [availableProducts]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleAddProduct = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        let payload = Object.fromEntries(formData);
        payload = {
            ...payload,
            product: JSON.parse(payload.product),
        }

        let productsChange = [...selectedProducts]
        if(productsChange.find(p => p.product.code === payload.product.code) === undefined) productsChange.push(payload);
        else {
            let index = productsChange.findIndex(x => x.product.code === payload.product.code);
            productsChange[index].quantity = Number(productsChange[index].quantity) + Number(payload.quantity);
        }
        setSelectedProducts(productsChange);
        console.log(productsChange)
    }

    const handleDelete = (e) => {
        const prodToDelete = JSON.parse(e.target.value);
        let productsChange = selectedProducts.filter((p) => p.product.id !== prodToDelete.product.id);
        setSelectedProducts(productsChange);
    }
    return (
        <>
            {isActive && <>
                <form id={"cmp-invoiceForm-2"} onSubmit={handleAddProduct}>
                    <div className={"cmp-invoiceForm-products"}>
                        <SelectBox name="product" label={"Seleccione un producto"} required>
                            {products.map((prod) => <option key={prod.id} value={JSON.stringify(prod)}>
                                {`${prod.name} - Precio: ${prod.price} por ${prod.idMeasureUnits.name}`}
                            </option>)}
                        </SelectBox>
                        <div className={"cmp-invoiceForm-autoFit"}>
                            <InputBox name="quantity" label={"Cantidad"}
                                      inputType="number"
                                      min={1}
                                      defaultValue={1}
                                      required/>
                            <input type={"submit"} value={"Agregar"} className="cmp-invoiceForm-button"/>
                        </div>
                    </div>
                </form>
                <ProductTable toShow={selectedProducts} onDelete={handleDelete}/>
            </>}
        </>)
}