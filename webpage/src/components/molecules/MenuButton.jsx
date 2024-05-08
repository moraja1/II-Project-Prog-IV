import '../components.css';
import { PropTypes } from "prop-types";

export default function MenuButton({ text, image, selected, callback }) {
    return (
        <button className={clicked ? "molecule-menuButton-selected" : "molecule-menuButton"} onClick={callback(updateButton)}>
            <span className="molecule-menuButton-img">{image}</span>
            <span className="molecule-menuButton-txt">{text}</span>
        </button>
    )
}

MenuButton.prototype = {
    text: PropTypes.String.isRequired,
    image: PropTypes.ELEMENT_NODE.isRequired,
    selected: PropTypes.Boolean.isRequired,
    callback: PropTypes.Callbacks.isRequired
}