import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext(null);


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));
    useEffect(() => {
        window.localStorage.setItem("user", JSON.stringify(user));
    }, [user]);


    /*{
        id: 1,
            naturalId: "202220222",
        password: null,
        name: "Dana",
        lastName: "Lisett",
        mobile: "96363504",
        email: "dlisett0@intel.com",
        enabled: 1,
        type: TYPES.PHYSICAL,
        role: ROLES.SUPPLIER.ENGLISH,
        isAuthenticated: true
    }*/

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}