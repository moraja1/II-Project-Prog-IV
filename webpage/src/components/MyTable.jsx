import './components.css';
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";

export default function MyTable() {
    let users = [
        {
            "id": 24,
            "naturalId": "202220222",
            "password": "oW0kAA91qF",
            "name": "Dana",
            "lastName": "Lisett",
            "mobile": "9636350406",
            "email": "dlisett0@intel.com",
            "enabled": 0,
            "type": "Physical",
            "role": "Supplier"
        },
        {
            "id": 25,
            "naturalId": "303330333",
            "password": "mS4FW5H&iV#1Q(",
            "name": "Bradney",
            "lastName": "Enefer",
            "mobile": "5083053497",
            "email": "benefer1@yelp.com",
            "enabled": 0,
            "type": "Physical",
            "role": "Supplier"
        },
        {
            "id": 26,
            "naturalId": "404440444",
            "password": "aU6/L3Lc",
            "name": "Minni",
            "lastName": "LEpiscopio",
            "mobile": "6203604625",
            "email": "mlepiscopio2@usa.gov",
            "enabled": 1,
            "type": "Physical",
            "role": "Supplier"
        }
    ]

    let headersName = [
        "Cedula", "Nombre", "Apellidos", "Teléfono", "Correo Electrónico", "Tipo", "Rol", "Activar o Desactivar"
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
            <td className="molecule-table-icon">{user.enabled ?
                <div className="molecule-table-icon"><a href="#">Activar Usuario</a><FaUserCheck /></div> :
                <div className="molecule-table-icon"><a href="#">Desactivar Usuario</a><IoPersonRemoveSharp /></div>}</td>
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
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </article>
    )
}
