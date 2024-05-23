import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext(null);


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));
    useEffect(() => {
        window.localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}