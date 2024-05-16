import {useMutation} from "@tanstack/react-query";
import API from '../../services/GeneralApi.js'
import {useState} from "react";

export const useClientForm = () => {
    const [isSuccess, setSuccess] = useState(false);
    const [isError, setError] = useState(false);
    const clientPost = useMutation({
        mutationKey: ['clientPost'],
        mutationFn: (client) => {
            API.post('client', client)
                .then((res) => {
                    setSuccess(true);
                    return res.data;
                })
        }
    })

    const handleModalRead = () => {
        setSuccess(false);
        setError(false);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();


        const formData = new FormData(evt.target);
        const payload = Object.fromEntries(formData);

        console.log(payload);
    }
}