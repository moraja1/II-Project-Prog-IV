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
    const [size] = useState(5);
    const { isPending, error, isFetching, ...userTable } = useQuery({
        queryKey: ['tableData'],
        queryFn: () =>
            axios
                .get(`http://localhost:8080/admin/users?page=${page}&size=${size}`)
                .then((res) => {
                    setUsers(res.data);
                    return res.data;
                }),
    })
    useEffect(() => {
        userTable.refetch();
    }, [page]);

    if (isPending || isFetching) return <TableAnimations />;
    if (error) return <ErrorPage />

    const handlePageBtns = (e) => {
        e.preventDefault();
        let element = e.target.name;
        element === undefined ? element = e.target.className.baseVal : element;
        if(element === "prev") page > 0 ? setPage(page-1) : {};
        if(element === "next") users.length === size ? setPage(page+1) : {};
    }

    const handleOnDeactivate = (e) => {
        e.preventDefault();
        let user = users.find((element) => element.id === Number(e.target.value));
        console.log(user);
        return null;
    }

    const handleOnActivate = (e) => {
        e.preventDefault();
        let user = users.find((element) => element.id === Number(e.target.value));
        console.log(user)
        return null;
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
                <div className="molecule-table-button" style={{color: "red"}}><button onClick={handleOnDeactivate} value={user.id} >Desactivar</button></div> :
                <div className="molecule-table-button" style={{color: "green"}}><button onClick={handleOnActivate} value={user.id} >Activar</button></div>}</td>
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
                <button name={"prev"} onClick={handlePageBtns} type={"button"} className={"main-button cmp-table-pagesBtn"}><GrLinkPrevious className={"prev"} /></button>
                <button name={"next"} onClick={handlePageBtns} type={"button"} className={"main-button cmp-table-pagesBtn"}><GrLinkNext className={"next"} /></button>
            </div>
        </div>

    )
}

export default UserTable;

