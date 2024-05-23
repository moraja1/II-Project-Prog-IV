import {PageHeader} from "./molecules/Header.jsx";
import MainMenu from "./MainMenu.jsx";
import {Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../services/Auth/AuthProvider.jsx";

const AppLayout = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            <PageHeader>
                <MainMenu role={user.roles[0].role.name} />
            </PageHeader>
            <Outlet />
        </>

    )
}

export default AppLayout;