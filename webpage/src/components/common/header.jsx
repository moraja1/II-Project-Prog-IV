import { PropTypes } from "prop-types";
import '../components.css';

export function PageHeader( {text} ) {
    return (
        <header className="common-header">
            <h1>{text}</h1>
        </header>
    )
}

PageHeader.propTypes = {
    text: PropTypes.string.isRequired
};