import {FaFileInvoiceDollar} from "react-icons/fa";
import InputBox from "../../molecules/InputBox.jsx";
import SelectBox from "../../molecules/SelectBox.jsx";
import {useContext, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {gnrlAPI} from "../../../services/Api.js";
import {AuthContext} from "../../../services/Auth/AuthProvider.jsx";
import {ModalMsg} from "../../Modal/ModalMessage.jsx";
import {ProductTableSelector} from "./ProductTableSelector.jsx";
import {ServiceTableSelector} from "./ServiceTableSelector.jsx";
import {HttpStatusCode} from "axios";

const utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
const API = (user) => {
    gnrlAPI.defaults.headers.common['sub'] = user.id;
    return gnrlAPI;
}

export const InvoiceForm = () => {
    const {user} = useContext(AuthContext); //Context
    const [isProduct, setIsProduct] = useState(true); //Invoice type
    const [failClientsModal, setFailClientsModal] = useState(false); //MODAL
    const [failProductsModal, setFailProductsModal] = useState(false); //MODAL
    const [failServicesModal, setFailServicesModal] = useState(false); //MODAL
    const [successModal, setSuccessModal] = useState(false); //MODAL
    const [failModal, setFailModal] = useState(false); //MODAL
    const [clientsRegistered, setClientsRegistered] = useState([]); //Supplier's Clients
    const [productsRegistered, setProductsRegistered] = useState([]); //Supplier's Products
    const [servicesRegistered, setServicesRegistered] = useState([]); //Supplier's Servicess
    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [invoiceServices, setInvoiceServices] = useState([]);
    const [iva, setIva] = useState(13);
    const [subtotal, setSubtotal] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const clientsQuerys = useQuery({
        queryKey: ['clientsQ'],
        queryFn: () =>
            API(user).get('/clients')
                .then(res => {
                    setClientsRegistered(res.data);
                    return res.data;
                })
                .catch(() => setFailClientsModal(true)),
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
    const invoicePost = useMutation({
        mutationKey: ['invoicePost'],
        mutationFn: (invoice) =>
            API(user).post('/invoice', invoice)
                .then((res) => {
                    if(res.status === HttpStatusCode.Ok) setSuccessModal(true);
                })
                .catch(() => setFailModal(true))
    })
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

    //------------------------HOOKS END---------------------------//
    //------------------------HOOKS END---------------------------//
    //------------------------HOOKS END---------------------------//

    const handleProductSelection = (product) => {
        let productsChange = [...invoiceProducts]
        let pushed = false;
        let total = 0;
        for (let p of productsChange) {
            if(p.product.code === product.product.code) {
                pushed = true;
                total = subtotal - Number(p.quantity) * Number(p.product.price);
                p.quantity = Number(p.quantity) + Number(product.quantity);
                total += Number(p.quantity) * Number(p.product.price);
                break;
            }
        }
        if(!pushed) {
            total += subtotal + Number(product.quantity) * Number(product.product.price);
            productsChange.push(product);
        }
        setInvoiceProducts(productsChange);
        setSubtotal(total);
        setTotalAmount(total + (total * (iva / 100)))
    }

    const handleProductDeleted = (product) => {
        let productsChange = invoiceProducts.filter((p) => p.product.id !== product.product.id);
        let total = subtotal - Number(product.quantity) * Number(product.product.price);
        setInvoiceProducts(productsChange);
        setSubtotal(total);
        setTotalAmount(total + (total * (iva / 100)))
    }

    const handleServiceSelection = (service) => {
        let servicesChange = [...invoiceServices]
        let pushed = false;
        let total = 0;
        for (let s of servicesChange) {
            if(s.service.id === service.service.id) {
                pushed = true;
                total = subtotal - Number(s.hourAmount) * Number(s.service.priceHour);
                s.hourAmount = Number(s.hourAmount) + Number(service.hourAmount);
                total += Number(s.hourAmount) * Number(s.service.priceHour);
                break;
            }
        }
        if(!pushed) {
            total += subtotal + Number(service.hourAmount) * Number(service.service.priceHour);
            servicesChange.push(service);
        }
        setInvoiceServices(servicesChange);
        setSubtotal(total);
        setTotalAmount(total + (total * (iva / 100)))
    }

    const handleServiceDeleted = (service) => {
        let servicesChange = invoiceServices.filter((s) => s.service.id !== service.service.id);
        let total = subtotal - Number(service.hourAmount) * Number(service.service.priceHour);
        setInvoiceServices(servicesChange);
        setSubtotal(total);
        setTotalAmount(total + (total * (iva / 100)))
    }

    const handleSellSelection = (e) => {
        if(e.target.selectedIndex === 0) setIsProduct(true)
        if(e.target.selectedIndex === 1) {
            servicesQuery.refetch();
            setIsProduct(false);
        }
    }

    const changeIVA = (e) => {
        setIva(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(invoiceServices.length === 0 && invoiceProducts.length === 0) return;

        const formData = new FormData(document.getElementById("cmp-invoiceForm-1"));
        let payload = Object.fromEntries(formData);
        const client = JSON.parse(payload.client)



        delete payload.product;
        delete payload.quantity;
        delete payload.service;
        delete payload.hourAmount;
        delete payload.idClient;

        payload = {
            ...payload,
            client: client,
            products: invoiceProducts,
            services: invoiceServices,
        }

        console.log(payload);
        invoicePost.mutate(payload);
    }
    const modalRead = () => {
        if(failProductsModal) {
            setFailProductsModal(false);
        }
        if(failServicesModal) {
            setFailServicesModal(false);
        }
        if(failClientsModal){
            setFailClientsModal(false);
        }
        if(successModal) {
            setSuccessModal(false);
        }
        if(failModal) {
            setFailModal(false)
        }
    }
    return (
        <>
            <ModalMsg
                message={"Factura ingresada correctamente."}
                activate={successModal} modalRead={modalRead}/>
            <ModalMsg
                message={"No se pudo registrar la factura. Pongase en contacto con el administrador."}
                activate={failModal} modalRead={modalRead}/>
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
                                  required={true}/>
                        <InputBox label={"Fecha"}
                                  inputType="date"
                                  defaultValue={utc}
                                  readOnly={true}/>
                    </div>
                    <SelectBox name="client" label={"Seleccione el cliente"} required>
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
                        <InputBox name="iva" label={"IVA"} onChange={changeIVA}
                                  inputType="number"
                                  errorMessage={"Por favor, ingrese el porcentaje de IVA"}
                                  max={100}
                                  min={0}
                                  defaultValue={iva}
                                  required={true}/>
                        <InputBox name="subtotal" label={"Subtotal"}
                                  inputType="number"
                                  value={subtotal}
                                  readOnly/>
                        <InputBox name="total" label={"Total"}
                                  inputType="number"
                                  value={totalAmount}
                                  readOnly/>
                    </div>
                    <input type={"submit"}
                           className={"main-button"
                               .concat(invoiceProducts.length === 0 && invoiceServices.length === 0 ? " disabled" : "")} value={"Facturar"}
                           disabled={invoiceProducts.length === 0 && invoiceServices.length === 0}/>
                </form>
            </article>
        </>
    )
}
