import PropTypes from "prop-types";
import '../components.css';
import {Outlet} from "react-router-dom";

export function PageHeader( ) {
    return (
        <>
            <div className="molecule-header">
                <h1>Facturas UNA</h1>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}

PageHeader.propTypes = {
    text: PropTypes.string
};