import './components.css';
import {FaUserCheck} from "react-icons/fa";
import {TiUserDelete} from "react-icons/ti";
import {useEffect, useState} from "react";
import {getUser} from "../services/AdminService.js";
import {ROLES, TYPES} from "../services/Constants.js";


export default function MyTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUser(1).then((response) => {
            setUsers([].push(response.data));
        }).catch(error => console.error(error));
    }, []);

    let headersName = [
        "Cedula", "Nombre", "Apellidos", "Teléfono", "Correo Electrónico", "Tipo", "Rol", "Tiene Acceso", "Activar o Desactivar"
    ]

    let rows = users.map((user) =>
        <tr key={user.id}>
            <td>{user.naturalId}</td>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.mobile}</td>
            <td>{user.email}</td>
            <td>{user.type === TYPES.PHYSICAL.ENGLISH ? TYPES.PHYSICAL.SPANISH : TYPES.JURIDICAL.SPANISH}</td>
            <td>{user.role === ROLES.ADMIN ? ROLES.ADMIN : ROLES.SUPPLIER.SPANISH}</td>
            <td>{user.enabled === 0 ? "NO" : "SI"}</td>
            <td className="molecule-table-icon">{user.enabled ?
                <div className="molecule-table-icon" style={{color: "red"}}><a>Desactivar Usuario</a><TiUserDelete/></div> :
                <div className="molecule-table-icon" style={{color: "green"}}><a>Activar Usuario</a><FaUserCheck/></div>}</td>
        </tr>
    );


    return (
        <article className="cmp-container usersTable">
            <h2 className="cmp-title">Usuarios registrados</h2>
            <table className="cmp-table">
                <thead>
                <tr>
                    <th>{headersName[0]}</th>
                    <th>{headersName[1]}</th>
                    <th>{headersName[2]}</th>
                    <th>{headersName[3]}</th>
                    <th>{headersName[4]}</th>
                    <th>{headersName[5]}</th>
                    <th>{headersName[6]}</th>
                    <th>{headersName[7]}</th>
                    <th>{headersName[8]}</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </article>
    )
}
