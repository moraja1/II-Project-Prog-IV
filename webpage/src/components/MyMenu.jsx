import './components.css';
import MenuButton from "./molecules/MenuButton.jsx";
import { PropTypes } from "prop-types";
import { FaHome } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoPeopleCircle } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import {useState} from "react";


//IMAGES
const homeImg = (<FaHome />)
const logout = (<RiLogoutBoxRFill />)
const profile = (<ImProfile />)
const accesses = (<IoPeopleCircle />)
const clients = (<FaMoneyCheckDollar />)

//BUTTONS
const homeBtnState = {
    text: "Home",
    image: homeImg,
    selected: true
}
const profileBtnState = {
    text: "Perfil",
    image: profile,
    selected: false
}
const accessesBtnState = {
    text: "Accesos",
    image: accesses,
    selected: false
}
const clientsBtnState = {
    text: "Clientes",
    image: clients,
    selected: false
}
const logoutBtnState = {
    text: "Logout",
    image: logout,
    selected: false
}


export default function MyMenu({ role }) {
    const menu = [homeBtnState, profileBtnState];
    menu.push((role === "Admin" ? accessesBtnState : clientsBtnState), logoutBtnState);
    const [menuState, setMenuState] = useState(menu)

    return (
        <nav className="cmp-menu">
            <MenuButton text="Home" image={homeImg} selected={homeState.selected} clickHandler={handleOnClick} />
            <MenuButton text="Perfil" image={profile} selected={profileState.selected} clickHandler={handleOnClick} />
            {
                 role === "Admin" ?
                <MenuButton text="Accesos" image={accesses} selected={accessesState.selected} clickHandler={handleOnClick} /> :
                <MenuButton text="Clientes" image={clients} selected={clientsState.selected} clickHandler={handleOnClick} />
            }
            <MenuButton text="Logout" image={logout} selected={false} clickHandler={handleOnClick}/>
        </nav>
    )
}

MyMenu.propTypes = {
    role: PropTypes.string.isRequired
}