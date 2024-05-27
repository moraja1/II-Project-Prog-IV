import '../../styles/components.css';
import { GrLinkNext,GrLinkPrevious  } from "react-icons/gr";
import {useTable} from "./UserTableHooks.jsx";
import TableAnimations from "../skeletons/TableAnimation.jsx";
import ErrorPage from "../error-page.jsx";
import {ROLES, TYPES} from "../../services/Constants.js";

const headersName = ["Cedula", "Nombre", "Apellidos", "Teléfono", "Correo Electrónico", "Tipo", "Rol", "Acceso", "Acción"]

const UserTable = () => {
    const {users, tableDataQuery, handlePageButtons, handleTableButton} = useTable();

    if (tableDataQuery.isPending || tableDataQuery.isFetching) return <TableAnimations />;
    if (tableDataQuery.error) return <ErrorPage />;

    return (
        <div className={"cmp-table-container"}>
            <table className="cmp-table">
                <caption className="cmp-table-title">Estos son los usuarios registrados</caption>
                <thead>
                <tr>
                    {headersName.map((th, index) => (<th key={index}>{th}</th>))}
                </tr>
                </thead>
                <tbody>
                {users.map((user) =>
                    <tr key={user.id}>
                        <td>{user.naturalId}</td>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.mobile}</td>
                        <td>{user.email}</td>
                        <td>{user.type === TYPES.PHYSICAL.ENGLISH ? TYPES.PHYSICAL.SPANISH : TYPES.JURIDICAL.SPANISH}</td>
                        <td>{user.role === ROLES.ADMIN ? ROLES.ADMIN : ROLES.SUPPLIER.SPANISH}</td>
                        <td>{user.enabled === false ? "NO" : "SI"}</td>
                        <td className="molecule-table-icon">{user.enabled ?
                            <div className="molecule-table-button" style={{color: "red"}}>
                                <button onClick={handleTableButton} value={JSON.stringify(user)} >Desactivar</button>
                            </div> :
                            <div className="molecule-table-button" style={{color: "green"}}>
                                <button onClick={handleTableButton} value={JSON.stringify(user)} >Activar</button>
                            </div>}</td>
                    </tr>)}
                </tbody>
            </table>
            <div className={"cmp-table-pagesBtns"}>
                <button name={"prev"} onClick={handlePageButtons} type={"button"} className={"main-button cmp-table-pagesBtn"}><GrLinkPrevious className={"prev"} /></button>
                <button name={"next"} onClick={handlePageButtons} type={"button"} className={"main-button cmp-table-pagesBtn"}><GrLinkNext className={"next"} /></button>
            </div>
        </div>

    )
}

export default UserTable;

