import UserTable from "./UserTable/UserTable.jsx";
import {ROLES} from "../services/Constants.js";
import {AuthContext} from "../services/Auth/AuthProvider.jsx";
import {useContext, useState} from "react";
import {InvoicesTable} from "./InvoicesTable.jsx";
import {InvoiceDocument} from "./InvoiceDocument.jsx";

const MyHome = () => {
    const { user } = useContext(AuthContext);
    const [invoice, setInvoice] = useState({invoice: {}, show: false});
    const reset = () => setInvoice({invoice: {}, show: false});

    return (
        <>
            <article className="cmp-container home-screen">
                <h1>{`Bienvenido, ${user.name} ${user.lastName}`}</h1>
                {user.roles[0].role.name === ROLES.ADMIN && <UserTable/>}
                {user.roles[0].role.name === ROLES.SUPPLIER.ENGLISH && <InvoicesTable setInvoice={setInvoice}/>}
            </article>
            {invoice.show &&
                <article className="cmp-container invoice-screen">
                    <InvoiceDocument invoice={invoice.invoice} />
                    <button className={"main-button"} onClick={reset} >Cerrar PDF</button>
                </article>
            }
        </>
    )
}

export default MyHome;