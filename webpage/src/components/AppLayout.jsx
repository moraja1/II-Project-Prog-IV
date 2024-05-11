import {PageHeader} from "./molecules/Header.jsx";
import MainMenu from "./MainMenu.jsx";
import {Outlet} from "react-router-dom";

const AppLayout = ({ role }) => {
    return (
        <>
            <PageHeader>
                <MainMenu role={role} />
            </PageHeader>
            <Outlet />
        </>

    )
}

export default AppLayout;