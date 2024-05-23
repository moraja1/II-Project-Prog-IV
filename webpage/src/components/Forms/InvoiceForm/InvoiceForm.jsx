import {FaFileInvoiceDollar} from "react-icons/fa";
import InputBox from "../../molecules/InputBox.jsx";
import SelectBox from "../../molecules/SelectBox.jsx";
import {useContext, useState} from "react";
import {ServiceTable} from "../../ServiceTable.jsx";
import {useQuery} from "@tanstack/react-query";
import {gnrlAPI} from "../../../services/Api.js";
import {AuthContext} from "../../../services/Auth/AuthProvider.jsx";
import {ModalMsg} from "../../Modal/ModalMessage.jsx";
import {ProductTableSelector} from "./ProductTableSelector.jsx";

const utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
const API = (user) => {
    gnrlAPI.defaults.headers.common['sub'] = user.id;
    return gnrlAPI;
}

export const InvoiceForm = () => {
    const {user} = useContext(AuthContext);
    const [isProduct, setIsProduct] = useState(true);
    const [productsIncluded, setProductsIncluded] = useState([]);
    const [servicesIncluded, setServicesIncluded] = useState([]);
    const [failProductsModal, setFailProductsModal] = useState(false);
    const [failServicesModal, setFailServicesModal] = useState(false);
    const [productsRegistered, setProductsRegistered] = useState([]);
    const [servicesRegistered, setServicesRegistered] = useState([]);
    const productsQuery = useQuery({
        queryKey: ['productsQ'],
        queryFn: () =>
            API(user).get('/products')
                .then(res => {
                    setProductsRegistered(res.data);
                    console.log(res.data)
                    return res.data;
                })
                .catch(() => setFailProductsModal(true))
    });

    const handleSellSelection = (e) => {
        if(e.target.selectedIndex === 0) setIsProduct(true)
        if(e.target.selectedIndex === 1) setIsProduct(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleAddProduct = () => {

    }

    const handleAddService = () => {

    }

    const modalRead = () => {
        if(failProductsModal) {
            setFailProductsModal(false);
        }
        if(failServicesModal) {
            setFailServicesModal(false);
        }
    }

    return (
        <>
            <ModalMsg message={"No se tiene ningún producto registrado"} activate={failProductsModal} modalRead={modalRead}/>
            <ModalMsg message={"No se tiene ningún servicio registrado"} activate={failServicesModal} modalRead={modalRead}/>
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
                <SelectBox name="sells" label={"Que va a facturar?"} onChange={handleSellSelection} disabled={productsIncluded.length > 0 || servicesIncluded.length > 0}>
                    <option value={"prods"}>Productos</option>
                    <option value={"servs"}>Servicios</option>
                </SelectBox>
                <ProductTableSelector isActive={isProduct} availableProducts={productsRegistered} />
                {!isProduct &&
                    <form id={"cmp-invoiceForm-2"} onSubmit={handleAddService}>
                        <div className={"cmp-invoiceForm-products"}>
                            <SelectBox name="services" label={"Seleccione un servicio"} required>
                                {/*OPTIONS*/}
                            </SelectBox>
                            <div className={"cmp-invoiceForm-autoFit"}>
                                <InputBox name="hourAmount" label={"Horas"}
                                          inputType="number"
                                          min={1}
                                          defaultValue={1}
                                          required/>
                                <button type={"submit"} className="cmp-invoiceForm-button">Agregar</button>
                            </div>
                        </div>
                    </form>}
                {servicesIncluded.length > 0 && <ServiceTable/>}
                <form id={"cmp-invoiceForm-3"} className={"cmp-invoiceForm"}>
                    <div className={"cmp-invoiceForm-ivaSubtotal"}>
                        <InputBox name="iva" label={"IVA"}
                                  inputType="number"
                                  errorMessage={"Por favor, ingrese el porcentaje de IVA"}
                                  max={100}
                                  min={0}
                                  defaultValue={13}
                                  required/>
                        <InputBox name="total" label={"Total"}
                                  inputType="number"
                                  defaultValue={0}
                                  disabled/>
                    </div>
                </form>
                <button className={"main-button"} type={"button"} onSelect={handleSubmit}>Facturar</button>
            </article>
        </>
    )
}
