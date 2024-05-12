import MyTable from "./MyTable.jsx";
import {ROLES} from "../services/Constants.js";

const MyHome = (props) => {
    return (
        <article className="cmp-container home-screen">
            <h1>{`Bienvenido, ${props.user.name} ${props.user.lastName}`}</h1>
            {props.user.role === ROLES.ADMIN && <MyTable />}
        </article>
    )
}

export default MyHome;