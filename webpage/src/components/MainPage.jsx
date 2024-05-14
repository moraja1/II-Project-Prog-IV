import {PageHeader} from "./molecules/Header.jsx";
import {Outlet} from "react-router-dom";

export const MainPage = () => {
    return (
        <div>
            <PageHeader />
            <Outlet />
        </div>
    )
}
