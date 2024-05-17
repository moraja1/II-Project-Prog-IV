import {useMutation} from "@tanstack/react-query";
import API from '../../services/GeneralApi.js'
import {useModal} from "../../services/ModalHook.js";

export const useClientForm = () => {
    const {isSuccess, isError, succeed, failed, modalRead} = useModal();
    const clientPost = useMutation({
        mutationKey: ['clientPost'],
        mutationFn: (client) => {
            API.post('client', client)
                .then((res) => {
                    succeed()
                    return res.data;
                })
                .catch(() => failed())
        }
    })

    const handleSubmit = (evt) => {
        evt.preventDefault();


        const formData = new FormData(evt.target);
        const payload = Object.fromEntries(formData);

        console.log(payload);
    }

    return({
        isSuccess,
        isError,
        modalRead,
        clientPost,
        handleSubmit
    })
}