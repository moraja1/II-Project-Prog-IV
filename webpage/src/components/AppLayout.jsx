import {PageHeader} from "./molecules/Header.jsx";
import MyMenu from "./MyMenu.jsx";

const AppLayout = ({ role }) => {
    return (
        <PageHeader>
            <MyMenu role={role} />
        </PageHeader>
    )
}

export default AppLayout;