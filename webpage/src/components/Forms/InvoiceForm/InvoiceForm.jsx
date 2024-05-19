import {FaFileInvoiceDollar} from "react-icons/fa";
import InputBox from "../../molecules/InputBox.jsx";
import SelectBox from "../../molecules/SelectBox.jsx";
import {ProductsTable} from "../../ProductsTable.jsx";
import {useState} from "react";
import {ServiceTable} from "../../ServiceTable.jsx";

const utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');

export const InvoiceForm = () => {

    const [isProduct, setIsProduct] = useState(true);

    const handleSellSelection = (e) => {
        if(e.target.selectedIndex === 0) setIsProduct(true)
        if(e.target.selectedIndex === 1) setIsProduct(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Hello")
    }

    const handleAddProduct = () => {

    }

    const handleAddService = () => {

    }

    return (
        <article className={"cmp-container invoiceForm"}>
            <form id={"cmp-invoiceForm-1"} className={"cmp-invoiceForm"}>
                <h2 className={"cmp-title"}>Generar Factura</h2>
                <FaFileInvoiceDollar className="cmp-invoiceForm-icon"/>
                <div className={"cmp-invoiceForm-dateCode"}>
                    <InputBox name="code" label={"Código"}
                              inputType="text"
                              errorMessage={"Por favor, ingrese un código de 4 caractéres como minimo"}
                              min={4}
                              required/>
                    <InputBox name="date" label={"Fecha"}
                              inputType="date"
                              defaultValue={utc}
                              disabled/>
                </div>
                <SelectBox name="idClient" label={"Seleccione el cliente"} required>
                    {/*OPTIONS*/}
                </SelectBox>
            </form>
            <SelectBox name="sells" label={"Que va a facturar?"} onChange={handleSellSelection}>
                <option value={"prods"}>Productos</option>
                <option value={"servs"}>Servicios</option>
            </SelectBox>

            {isProduct &&
                <form id={"cmp-invoiceForm-2"} onSubmit={handleAddProduct}>
                    <div className={"cmp-invoiceForm-products"}>
                        <SelectBox name="products" label={"Seleccione un producto"} required>
                            {/*OPTIONS*/}
                        </SelectBox>
                        <div className={"cmp-invoiceForm-autoFit"} >
                            <InputBox name="quantity" label={"Cantidad"}
                                      inputType="number"
                                      min={1}
                                      defaultValue={1}
                                      required/>
                            <button type={"submit"} className="cmp-invoiceForm-button">Agregar</button>
                        </div>
                    </div>
                </form>}
            {isProduct && <ProductsTable />}
            {!isProduct &&
                <form id={"cmp-invoiceForm-2"} onSubmit={handleAddService}>
                    <div className={"cmp-invoiceForm-products"}>
                        <SelectBox name="services" label={"Seleccione un servicio"} required>
                            {/*OPTIONS*/}
                        </SelectBox>
                        <div className={"cmp-invoiceForm-autoFit"} >
                            <InputBox name="hourAmount" label={"Horas"}
                                      inputType="number"
                                      min={1}
                                      defaultValue={1}
                                      required/>
                            <button type={"submit"} className="cmp-invoiceForm-button">Agregar</button>
                        </div>
                    </div>
                </form>}
            {!isProduct && <ServiceTable />}
            <form id={"cmp-invoiceForm-3"} className={"cmp-invoiceForm"} >
                <div className={"cmp-invoiceForm-ivaSubtotal"}>
                    <InputBox name="iva" label={"IVA"}
                              inputType="number"
                              errorMessage={"Por favor, ingrese el porcentaje de IVA"}
                              max={100}
                              min={0}
                              defaultValue={13}
                              required/>
                    <InputBox name="subtotal" label={"Subtotal"}
                              inputType="number"
                              defaultValue={0}
                              disabled/>
                </div>
            </form>
            <button className={"main-button"} type={"button"} onSelect={handleSubmit}>Facturar</button>
        </article>
    )
}
