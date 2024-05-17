import {useMutation} from "@tanstack/react-query";
import API from '../../services/GeneralApi.js'
import {useModal} from "../../services/ModalHook.js";
import {HttpStatusCode} from "axios";
import {useContext} from "react";
import {AuthContext} from "../../services/AuthProvider.jsx";

export const useClientForm = () => {
    const { user } = useContext(AuthContext);
    const {isSuccess, isError, succeed, failed, modalRead} = useModal();
    const clientPost = useMutation({
        mutationKey: ['clientPost'],
        mutationFn: (client) => {
            API.post('client', client)
                .then((res) => {
                    if(res.status === HttpStatusCode.Forbidden) {
                        failed();
                        return;
                    }
                    succeed();
                    return res.data;
                })
                .catch(() => failed())
        }
    })

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const payload = Object.fromEntries(formData);

        const clientToPut = {
            supplierId: user.id,
            naturalId: payload.naturalId,
            name: payload.name,
            lastName: payload.lastName,
            email: payload.email,
            mobile: payload.mobile,
        }

        clientPost.mutate(clientToPut);
    }

    return({
        isSuccess,
        isError,
        modalRead,
        clientPost,
        handleSubmit
    })
}