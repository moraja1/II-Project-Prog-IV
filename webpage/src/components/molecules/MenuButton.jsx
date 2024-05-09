import '../components.css';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export default function MenuButton({ text, image, link } ) {

    return (
        <Link to={link} /*className={selected ? "molecule-menuButton-selected" : "molecule-menuButton"}*/ >
            <span className="molecule-menuButton-img">{image}</span>
            <span className="molecule-menuButton-txt">{text}</span>
        </Link>
    )
}

MenuButton.propTypes = {
    text: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired
}