import {FaFileInvoiceDollar} from "react-icons/fa";
import InputBox from "../../molecules/InputBox.jsx";
import SelectBox from "../../molecules/SelectBox.jsx";
import {useContext, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {gnrlAPI} from "../../../services/Api.js";
import {AuthContext} from "../../../services/Auth/AuthProvider.jsx";
import {ModalMsg} from "../../Modal/ModalMessage.jsx";
import {ProductTableSelector} from "./ProductTableSelector.jsx";
import {ServiceTableSelector} from "./ServiceTableSelector.jsx";

const utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
const API = (user) => {
    gnrlAPI.defaults.headers.common['sub'] = user.id;
    return gnrlAPI;
}

export const InvoiceForm = () => {
    const {user} = useContext(AuthContext);
    const [isProduct, setIsProduct] = useState(true);
    const [failClientsModal, setFailClientsModal] = useState(false);
    const [failProductsModal, setFailProductsModal] = useState(false);
    const [failServicesModal, setFailServicesModal] = useState(false);
    const [clientsRegistered, setClientsRegistered] = useState([]);
    const [productsRegistered, setProductsRegistered] = useState([]);
    const [servicesRegistered, setServicesRegistered] = useState([]);
    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [invoiceServices, setInvoiceServices] = useState([]);
    const clientsQuerys = useQuery({
        queryKey: ['clientsQ'],
        queryFn: () =>
            API(user).get('/clients')
                .then(res => {
                    setClientsRegistered(res.data);
                    return res.data;
                })
                .catch(() => setFailClientsModal(true))
    })
    const productsQuery = useQuery({
        queryKey: ['productsQ'],
        queryFn: () =>
            API(user).get('/products')
                .then(res => {
                    setProductsRegistered(res.data);
                    return res.data;
                })
                .catch(() => setFailProductsModal(true))
    });
    const servicesQuery = useQuery({
        queryKey: ['servicesQ'],
        queryFn: () =>
            API(user).get('/services')
                .then(res => {
                    setServicesRegistered(res.data);
                    return res.data;
                })
                .catch(() => setFailServicesModal(true)),
        enabled: false,
    });

    const handleProductSelection = (product) => {
        let productsChange = [...invoiceProducts]
        let pushed = false;
        for (let p of productsChange) {
            if(p.product.code === product.product.code) {
                pushed = true;
                p.quantity = Number(p.quantity) + Number(product.quantity);
                break;
            }
        }
        if(!pushed) productsChange.push(product);
        setInvoiceProducts(productsChange);
    }

    const handleProductDeleted = (product) => {
        let productsChange = invoiceProducts.filter((p) => p.product.id !== product.product.id);
        setInvoiceProducts(productsChange);
    }

    const handleServiceSelection = (service) => {
        let servicesChange = [...invoiceServices]
        let pushed = false;
        for (let p of servicesChange) {
            if(p.service.id === service.service.id) {
                pushed = true;
                p.hourAmount = Number(p.hourAmount) + Number(service.hourAmount);
                break;
            }
        }
        if(!pushed) servicesChange.push(service);
        setInvoiceServices(servicesChange);
    }

    const handleServiceDeleted = (service) => {
        let servicesChange = invoiceServices.filter((s) => s.service.id !== service.service.id);
        setInvoiceServices(servicesChange);
    }

    const handleSellSelection = (e) => {
        if(e.target.selectedIndex === 0) setIsProduct(true)
        if(e.target.selectedIndex === 1) {
            servicesQuery.refetch();
            setIsProduct(false);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(document.getElementById("cmp-invoiceForm-1"));
        const payload = Object.fromEntries(formData);

        console.log(payload)
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
            <ModalMsg message={"No se tiene ningún cliente registrado, por favor registre un sus clientes antes de facturar"}
                      activate={failClientsModal}
                      modalRead={modalRead}/>
            <ModalMsg message={"No se tiene ningún producto registrado, por favor registre sus productos antes de facturar"}
                      activate={failProductsModal}
                      modalRead={modalRead}/>
            <ModalMsg message={"No se tiene ningún servicio registrado, por favor registre sus productos antes de facturar"}
                      activate={failServicesModal}
                      modalRead={modalRead}/>
            <article className={"cmp-container invoiceForm"}>
                <form id={"cmp-invoiceForm-1"} className={"cmp-invoiceForm"} onSubmit={handleSubmit}>
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
                        {clientsRegistered.map((client) => <option key={client.id} value={JSON.stringify(client)}>
                            {`${client.name} ${client.lastName} - Cédula: ${client.naturalId}`}
                        </option>)}
                    </SelectBox>
                    <SelectBox name="sells" label={"Que va a facturar?"} onChange={handleSellSelection} disabled={invoiceProducts.length > 0 || invoiceServices.length > 0}>
                        <option value={"prods"}>Productos</option>
                        <option value={"servs"}>Servicios</option>
                    </SelectBox>
                    <ProductTableSelector
                        isActive={isProduct}
                        availableProducts={productsRegistered}
                        selectedProducts={invoiceProducts}
                        onProductSelected={handleProductSelection} onProductDeleted={handleProductDeleted}/>
                    <ServiceTableSelector
                        isActive={!isProduct}
                        availableServices={servicesRegistered}
                        selectedServices={invoiceServices}
                        onServiceSelected={handleServiceSelection} onServiceDeleted={handleServiceDeleted}/>
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
                    <input type={"submit"} className={"main-button"} value={"Facturar"}/>
                </form>
            </article>
        </>
    )
}
