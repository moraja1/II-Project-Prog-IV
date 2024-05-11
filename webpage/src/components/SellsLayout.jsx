import SellsMenu from './SellsMenu';
import {Outlet} from "react-router-dom";

const SellsLayout = () => {
    return(
        <div className={"cmp-sells-layout"}>
            <SellsMenu />
            <Outlet />
            <div className={"fill"}/>
        </div>
    )
}

export default SellsLayout;