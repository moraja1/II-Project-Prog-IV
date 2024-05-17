import {createContext, useState} from "react";

export const AuthContext = createContext(null);


export default function AuthProvider({ children }) {
    const [user, setUser] = useState({
        id: 1,
        naturalId: "202220222",
        password: null,
        name: "Dana",
        lastName: "Lisett",
        mobile: "96363504",
        email: "dlisett0@intel.com",
        enabled: 1,
        type: "Physical",
        role: "Supplier",
        isAuthenticated: true
    });

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}