import '../styles/components.css';
import {useEffect, useState} from "react";
import {ROLES, TYPES} from "../services/Constants.js";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import TableAnimations from "./skeletons/TableAnimation.jsx";
import ErrorPage from "./error-page.jsx";
import { GrLinkNext,GrLinkPrevious  } from "react-icons/gr";



const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);

    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            axios
                .get(`http://localhost:8080/admin/users?page=${page}&size=5`)
                .then((res) => {
                    setUsers(res.data);
                    return res.data;
                }),
    })

    if (isPending || isFetching) return <TableAnimations />;
    if (error) return <ErrorPage />

    const handlePageBtns = (e) => {
        console.log(e.target.name)
    }

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
        <div className={"cmp-table-container"}>
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
            <div className={"cmp-table-pagesBtns"}>
                <button name={"prev"} onClick={handlePageBtns} type={"button"} className={"main-button cmp-table-pagesBtn"}><GrLinkPrevious /></button>
                <button name={"next"} onClick={handlePageBtns} type={"button"} className={"main-button cmp-table-pagesBtn"}><GrLinkNext /></button>
            </div>
        </div>

    )
}

export default UserTable;

