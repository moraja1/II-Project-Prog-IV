import '../components.css';
import { PropTypes } from "prop-types";
import {useEffect, useState} from "react";

export default function MenuButton({ text, image, selected, clickHandler } ) {
    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(selected)
    }, []);

    return (
        <button className={isSelected ? "molecule-menuButton-selected" : "molecule-menuButton"} onClick={clickHandler} >
            <span className="molecule-menuButton-img">{image}</span>
            <span className="molecule-menuButton-txt">{text}</span>
        </button>
    )
}

MenuButton.propTypes = {
    text: PropTypes.string.isRequired,
    image: PropTypes.elementType.isRequired,
    selected: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func.isRequired
}