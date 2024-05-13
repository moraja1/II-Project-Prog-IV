import '../styles/components.css';
import {useEffect, useState} from "react";
import {ROLES, TYPES} from "../services/Constants.js";


const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers([
            {
                "id": 1,
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
                "id": 2,
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
                "id": 3,
                "naturalId": "404440444",
                "password": "aU6L3Lc",
                "name": "Minni",
                "lastName": "Lepiscopio",
                "mobile": "6203604625",
                "email": "mlepiscopio2@usa.gov",
                "enabled": 1,
                "type": "Physical",
                "role": "Supplier"
            },
            {
                "id": 4,
                "naturalId": "505550555",
                "password": "fsgdfhsh",
                "name": "Maggie",
                "lastName": "Trabikta",
                "mobile": "2566633154",
                "email": "Trabikta@co.gov",
                "enabled": 0,
                "type": "Juridical",
                "role": "Supplier"
            },
            {
                "id": 5,
                "naturalId": "606660666",
                "password": "errtutuiy",
                "name": "Maritza",
                "lastName": "Estupiñam",
                "mobile": "25666333211",
                "email": "Estipikddss@ibm.corp",
                "enabled": 0,
                "type": "Physical",
                "role": "Supplier"
            },
            {
                "id": 6,
                "naturalId": "707770777",
                "password": "bvnbcaerte",
                "name": "Crampble",
                "lastName": "Gladiatore",
                "mobile": "9996654984",
                "email": "Gfjhdfbsa@yahoo.es",
                "enabled": 1,
                "type": "Physical",
                "role": "Supplier"
            }
        ])
    }, []);

    let headersName = [
        "Cedula", "Nombre", "Apellidos", "Teléfono", "Correo Electrónico", "Tipo", "Rol", "Acceso", "Acción"
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
                <div className="molecule-table-icon" style={{color: "red"}}><a>Desactivar</a></div> :
                <div className="molecule-table-icon" style={{color: "green"}}><a>Activar</a></div>}</td>
        </tr>
    );


    return (
        <table className="cmp-table">
            <caption className="cmp-table-title">Estos son los usuarios registrados</caption>
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
    )
}

export default UserTable;

