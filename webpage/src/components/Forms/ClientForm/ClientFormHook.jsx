import {useMutation} from "@tanstack/react-query";
import API from '../../../services/GeneralApi.js'
import {useModal} from "../../Modal/ModalHook.js";
import {HttpStatusCode} from "axios";
import {useContext} from "react";
import {AuthContext} from "../../../services/Auth/AuthProvider.jsx";

export const useClientForm = () => {
    const { user } = useContext(AuthContext);
    const {isSuccess, isError, succeed, failed, modalRead} = useModal();
    const clientPost = useMutation({
        mutationFn: (clientToAdd => {
            API.put(`client`, clientToAdd)
                .then(res => {
                    if(res.status === HttpStatusCode.Forbidden) {
                        failed();
                        return;
                    }
                    succeed();
                    return res.data;
                })
                .catch(() => failed())
        }),
        onError: () => failed()
    })

    const handleSubmit = (e) => {
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);
        let clientToAdd = {
            supplierId: user.id,
            name: payload.name,
            lastName: payload.lastName,
            naturalId: payload.naturalId,
            mobile: payload.mobile || "",
            email: payload.email,
        };

        clientPost.mutate(clientToAdd);
        e.preventDefault();
    }
    return({
        isSuccess,
        isError,
        modalRead,
        clientPost,
        handleSubmit
    })
}