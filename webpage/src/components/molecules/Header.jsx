import { PropTypes } from "prop-types";
import '../components.css';

export function PageHeader( {text = "Facturas UNA"} ) {
    return (
        <header className="molecule-header">
            <h1>{text}</h1>
        </header>
    )
}

PageHeader.propTypes = {
    text: PropTypes.string
};