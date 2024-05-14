import {createContext, useState} from "react";
import {User} from "./types/User.js";

export const AuthContext = createContext(null);


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(new User(1, "202220222", "oW0kAA91qF", "Dana",
        "Lisett", "9636350406", "dlisett0@intel.com", 0, "Physical", "Admin",
        true));

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}