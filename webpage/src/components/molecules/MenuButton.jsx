import '../../styles/components.css';
import {NavLink} from "react-router-dom";

const MenuButton = (props) => {
    const {link, image, text} = props;
    const customOnClick = () => {
        props.onClick(link);
    }

    return (
        <div onClick={customOnClick} >
            <NavLink to={link} className={({isActive, isPending}) =>
                isPending ? "molecule-menuButton" :
                    isActive ? "molecule-menuButton active" : "molecule-menuButton"} end>
                <span className="molecule-menuButton-img">{image}</span>
                <span className="molecule-menuButton-txt">{text}</span>
            </NavLink>
        </div>
    )
}

export default MenuButton;