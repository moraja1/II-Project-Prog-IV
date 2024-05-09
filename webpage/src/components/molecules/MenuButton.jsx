import '../components.css';
import { PropTypes } from "prop-types";

export default function MenuButton({ index ,text, image, selected, updateElement } ) {
    const handleClick = () => {
        updateElement(index);
    }

    return (
        <Link type="button" className={selected ? "molecule-menuButton-selected" : "molecule-menuButton"} onClick={handleClick} >
            <span className="molecule-menuButton-img">{image}</span>
            <span className="molecule-menuButton-txt">{text}</span>
        </Link>
    )
}

MenuButton.propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    updateElement: PropTypes.func.isRequired
}