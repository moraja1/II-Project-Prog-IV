import UserTable from "./UserTable/UserTable.jsx";
import {ROLES} from "../services/Constants.js";
import {AuthContext} from "../services/Auth/AuthProvider.jsx";
import {useContext} from "react";
import {InvoicesTable} from "./InvoicesTable.jsx";

const MyHome = () => {
    const { user } = useContext(AuthContext);

    return (
        <article className="cmp-container home-screen">
            <h1>{`Bienvenido, ${user.name} ${user.lastName}`}</h1>
            {user.roles[0].role.name === ROLES.ADMIN && <UserTable />}
            {user.roles[0].role.name === ROLES.SUPPLIER.ENGLISH && <InvoicesTable />}
        </article>
    )
}

export default MyHome;