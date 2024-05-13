import '../../styles/components.css';
import {NavLink} from "react-router-dom";

const MenuButton = (props) => {
    const {link, image, text} = props;

    return (
        <NavLink to={link} className={({isActive, isPending}) =>
            isPending ? "molecule-menuButton" :
            isActive ? "molecule-menuButton active" : "molecule-menuButton"} end>
            <span onClick={props.onClick} className="molecule-menuButton-img">{image}</span>
            <span className="molecule-menuButton-txt">{text}</span>
        </NavLink>
    )
}

export default MenuButton;