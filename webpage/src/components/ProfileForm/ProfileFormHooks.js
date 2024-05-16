import {useMutation} from "@tanstack/react-query";
import {AuthContext} from "../../services/AuthProvider.jsx";
import {useContext, useState} from "react";
import API from '../../services/GeneralApi.js'
import {HttpStatusCode} from "axios";

const apiUrl = "http://localhost:8080/api/users"
export const useProfileForm = () => {
    const {user, setUser} = useContext(AuthContext);
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const profileMutation = useMutation({
        mutationKey: ['profileMutation'],
        mutationFn: (userChanged) =>{
            API.patch(`${apiUrl}/${user.id}`, userChanged)
                .then(res => {
                    if(res.status === HttpStatusCode.NoContent) {
                        setError(true);
                        return;
                    }
                    setUser(res.data);
                    return res.data;
                })
        },
        onError: () => setError(true),
        onSuccess: () => setSuccess(true)
    })

    const handleModalRead = () => {
        setSuccess(false);
        setError(false);
    }

    const handleSubmit = (e) => {
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);
        let userChanged = {
            ...user,
            name: payload.name,
            lastName: payload.lastName,
            mobile: payload.mobile,
            email: payload.email,
            password: payload.password
        };

        profileMutation.mutate(userChanged);
        e.preventDefault();
    }

    return({
        user,
        profileMutation,
        handleSubmit,
        isError,
        isSuccess,
        handleModalRead
    })
}
