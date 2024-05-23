import {useMutation} from "@tanstack/react-query";
import {AuthContext} from "../../../services/Auth/AuthProvider.jsx";
import {useContext} from "react";
import {gnrlAPI} from '../../../services/Api.js'
import {HttpStatusCode} from "axios";
import {useModal} from "../../Modal/ModalHook.js";

export const useProfileForm = () => {
    const {user, setUser} = useContext(AuthContext);
    const {isSuccess, isError, succeed, failed, modalRead} = useModal();
    const profileMutation = useMutation({
        mutationKey: ['profileMutation'],
        mutationFn: (userChanged) =>{
            gnrlAPI.patch('/profile', userChanged)
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
        payload.naturalId = user.naturalId;
        profileMutation.mutate(payload);

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
