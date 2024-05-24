import {AuthContext} from "./AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";

export const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null || !user.isAuthenticated || !user.enabled || typeof user === "undefined") {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    return (children)
}
