import {PageHeader} from "./molecules/Header.jsx";
import MyMenu from "./MyMenu.jsx";
import {Outlet} from "react-router-dom";

const AppLayout = ({ role }) => {
    return (
        <>
            <PageHeader>
                <MyMenu role={role} />
            </PageHeader>
            <Outlet />
        </>

    )
}

export default AppLayout;