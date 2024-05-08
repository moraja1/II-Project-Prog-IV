import '../components.css';
import { PropTypes } from "prop-types";
import {useState} from "react";

export default function MenuButton({ text, image }) {
    const [selected, setSelected] = useState(false);

    const selectButton = () => setSelected(!selected);

    return (
        <button className={selected ? "molecule-menuButton" : "molecule-menuButton-selected"} onClick={selectButton}>
            <span className="molecule-menuButton-img">{image}</span>
            <span className="molecule-menuButton-txt">{text}</span>
        </button>
    )
}

MenuButton.prototype = {
    text: PropTypes.string.isRequired,
    image: PropTypes.element.isRequired
}