import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";

const usersUrl = "http://localhost:8080/admin/users";

export const useTable = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const tableDataQuery = useQuery({
        queryKey: ['tableData'],
        queryFn: () =>
            axios
                .get(usersUrl, {params: {page: page, size: size}})
                .then((res) => {
                    setUsers(res.data);
                    return res.data;
                }),
    });
    useEffect(() => {
        tableDataQuery.refetch();
    }, [page]);

    const patchUserQuery = useMutation({
        mutationKey: ['patchUser'],
        mutationFn: (user) =>{
            if (user === null) return
            axios
                .patch(`${usersUrl}/${user.id}`, user)
                .then(res => {
                    let usersChanged = users.map(u => u.id === user.id ? user : u);
                    setUsers(usersChanged);
                    return res.data;
                })
        }
    });

    const handlePageButtons = (e) => {
        e.preventDefault();
        let element = e.target.name;
        element === undefined ? element = e.target.className.baseVal : element;
        if(element === "prev") page > 0 ? setPage(page-1) : {};
        if(element === "next") users.length === size ? setPage(page+1) : {};
    }

    const handleTableButton = (e) => {
        e.preventDefault();
        let user = JSON.parse(e.target.value)
        user.enabled = !user.enabled;
        patchUserQuery.mutate(user);
    }

    return ({
        users,
        tableDataQuery,
        handlePageButtons,
        handleTableButton
    })
}