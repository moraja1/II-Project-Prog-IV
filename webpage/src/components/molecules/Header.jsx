import '../components.css';
import {Outlet} from "react-router-dom";

export function PageHeader({ children }) {
    return (
        <>
            <div className="molecule-header">
                <h1>Facturas UNA</h1>
            </div>
            <div id="detail">
                {children}
                <Outlet />
            </div>
        </>
    );
}