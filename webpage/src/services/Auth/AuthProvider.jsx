import {createContext, useState} from "react";
import {ROLES, TYPES} from "../Constants.js";

export const AuthContext = createContext(undefined);


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined);


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