import {useMutation} from "@tanstack/react-query";
import {AuthContext} from "../../../services/Auth/AuthProvider.jsx";
import {useContext} from "react";
import API from '../../../services/GeneralApi.js'
import {HttpStatusCode} from "axios";
import {useModal} from "../../Modal/ModalHook.js";

const apiUrl = "http://localhost:8080/api/users"
export const useProfileForm = () => {
    const {user, setUser} = useContext(AuthContext);
    const {isSuccess, isError, succeed, failed, modalRead} = useModal();
    const profileMutation = useMutation({
        mutationKey: ['profileMutation'],
        mutationFn: (userChanged) =>{
            API.patch(`${apiUrl}/${user.id}`, userChanged)
                .then(res => {
                    if(res.status === HttpStatusCode.NoContent) {
                        failed();
                        return;
                    }
                    setUser(res.data);
                    succeed();
                    return res.data;
                })
                .catch(() => failed())
        },
        onError: () => failed()
    })

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
        modalRead
    })
}
