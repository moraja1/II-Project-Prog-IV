import './components.css';
import {FaUserCheck} from "react-icons/fa";
import {TiUserDelete} from "react-icons/ti";
import {useEffect, useState} from "react";
import {userList} from "../services/AdminService.js";


export default function MyTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userList().then((response) => {
            setUsers(response.data);
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
            <td>{user.type}</td>
            <td>{user.role}</td>
            <td>{user.enabled === 0 ? "NO" : "SI"}</td>
            <td className="molecule-table-icon">{user.enabled ?
                <div className="molecule-table-icon" style={{color: "red"}}><a href="#">Desactivar Usuario</a><TiUserDelete/></div> :
                <div className="molecule-table-icon" style={{color: "green"}}><a href="#">Activar Usuario</a><FaUserCheck/></div>}</td>
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
