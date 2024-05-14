import UserTable from "./UserTable.jsx";
import {ROLES} from "../services/Constants.js";
import {AuthContext} from "../AuthProvider.jsx";
import {useContext} from "react";

const MyHome = () => {
    const { user } = useContext(AuthContext);

    return (
        <article className="cmp-container home-screen">
            <h1>{`Bienvenido, ${user.name} ${user.lastName}`}</h1>
            {user.role === ROLES.ADMIN && <UserTable />}
        </article>
    )
}

export default MyHome;