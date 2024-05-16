import {useState} from "react";

export const useModal = () => {
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const succeed = () => setSuccess(true);
    const failed = () => setError(true);

    const modalRead = () => {
        setSuccess(false);
        setError(false);
    }

    return({
        isSuccess,
        isError,
        succeed,
        failed,
        modalRead
    })
}