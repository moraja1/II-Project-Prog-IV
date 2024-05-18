import {useState} from "react";

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: "white",
    border: '2px solid #fff',
    boxShadow: 24,
    borderRadius: '25px',
    p: 4,
    textAlign: "center"
};

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