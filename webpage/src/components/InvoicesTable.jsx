import {GrLinkNext, GrLinkPrevious} from "react-icons/gr";
import {useQuery} from "@tanstack/react-query";
import {gnrlAPI} from "../services/Api.js";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../services/Auth/AuthProvider.jsx";
import { saveAs } from 'file-saver';
import { toXML } from 'jstoxml';

let headersName = ["Fecha", "Codigo", "Cliente", "Cantidad de Productos", "Horas de Servicio", "IVA", "Subtotal", "Total", "PDF", "XML"]
const API = (user) => {
    gnrlAPI.defaults.headers.common['sub'] = user.id;
    return gnrlAPI;
}

export function InvoicesTable({ setInvoice }) {
    const {user} = useContext(AuthContext);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [invoices, setInvoices] = useState([]);
    const invoicesQuery = useQuery({
        queryKey: ['invoicesQuery'],
        queryFn: () => API(user).get('/invoices', {params: {page: page, size: size}})
            .then((res) => {
                const sorted = res.data;
                sorted.sort((a,b) => {
                    const x = a.code.toLocaleLowerCase();
                    const y = b.code.toLocaleLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                })
                setInvoices(sorted);
                return res.data;
            })
    })
    useEffect(() => {
        invoicesQuery.refetch();
    }, [page]);

    const handlePageButtons = (e) => {
        e.preventDefault();
        let element = e.target.name;
        element === undefined ? element = e.target.className.baseVal : element;
        if(element === "prev") page > 0 ? setPage(page-1) : {};
        if(element === "next") invoices.length === size ? setPage(page+1) : {};
    }

    const handleTableButtonPDF = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let payload = JSON.parse(e.target.value)
        const reg = /^(\d{4}-\d{2}-\d{2}).*$/
        const resultDate = reg.exec(payload.date);
        const newInvoice = {
            invoice: {
                ...payload,
                date: resultDate[1],
                supplier: user,
            },
            show: true,
        }
        setInvoice(newInvoice);
    }

    const handleTableButtonXML = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let payload = JSON.parse(e.target.value)
        const reg = /^(\d{4}-\d{2}-\d{2}).*$/
        const resultDate = reg.exec(payload.date);
        let newSupplier = user;
        delete newSupplier.id;
        delete newSupplier.enabled;
        delete newSupplier.roles;
        delete newSupplier.type;
        delete newSupplier.clients;
        delete newSupplier.invoices;
        delete newSupplier.products;
        delete newSupplier.services;
        delete newSupplier.isAuthenticated;

        const newInvoice = {
            invoice: {
                ...payload,
                date: resultDate[1],
                supplier: newSupplier,
            },
        }
        const config = {
            indent: '    '
        };
        const xmlData = toXML(newInvoice, config);
        downloadXML(xmlData);
    }

    const downloadXML = (xmlData) => {
        const blob = new Blob([xmlData], { type: 'application/xml' });
        saveAs(blob, 'factura.xml');
    };

    return (
        <div className={"cmp-table-container"}>
            <table className="cmp-table center-data invoices-table">
                <caption className="cmp-table-title">Estas son las facturas registradas</caption>
                <thead>
                <tr>
                    {headersName.map((th, index) => (<th key={index}>{th}</th>) )}
                </tr>
                </thead>
                <tbody>
                {invoices.map((inv) => {
                    const reg = /^(\d{4}-\d{2}-\d{2}).*$/
                    const resultDate = reg.exec(inv.date);
                    let prodQuant = 0;
                    for (let i of inv.invoiceProducts) {
                        prodQuant += i.quantity;
                    }
                    let servQuantity = 0;
                    for (let i of inv.invoiceServices) {
                        servQuantity += i.hourAmount;
                    }

                    return <tr key={inv.id}>
                        <td>{resultDate[1]}</td>
                        <td>{inv.code}</td>
                        <td>{inv.client.name + " " + inv.client.lastName}</td>
                        <td>{prodQuant}</td>
                        <td>{servQuantity}</td>
                        <td>{inv.iva}</td>
                        <td>{inv.subtotal}</td>
                        <td>{inv.totalPrice}</td>
                        <td className="molecule-table-icon">
                            <div className="molecule-table-button" style={{color: "blue"}}>
                                <button onClick={handleTableButtonPDF} value={JSON.stringify(inv)}>Ver</button>
                            </div>
                        </td>
                        <td className="molecule-table-icon">
                            <div className="molecule-table-button" style={{color: "blue"}}>
                                <button onClick={handleTableButtonXML} value={JSON.stringify(inv)}>Ver</button>
                            </div>
                        </td>
                    </tr>
                })
                }
                </tbody>
            </table>
            <div className={"cmp-table-pagesBtns"}>
                <button name={"prev"} onClick={handlePageButtons} type={"button"}
                        className={"main-button cmp-table-pagesBtn"}><GrLinkPrevious className={"prev"}/></button>
                <button name={"next"} onClick={handlePageButtons} type={"button"} className={"main-button cmp-table-pagesBtn"}><GrLinkNext className={"next"} /></button>
            </div>
        </div>

    )
}