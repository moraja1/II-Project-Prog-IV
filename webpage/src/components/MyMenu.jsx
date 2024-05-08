import './components.css';
import MenuButton from "./molecules/MenuButton.jsx";
import { PropTypes } from "prop-types";
import { FaHome } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoPeopleCircle } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import {useState} from "react";



const homeImg = (<FaHome />)
const logout = (<RiLogoutBoxRFill />)
const profile = (<ImProfile />)
const accesses = (<IoPeopleCircle />)
const clients = (<FaMoneyCheckDollar />
)

// eslint-disable-next-line react/prop-types
export default function MyMenu({ role }) {
    const [selectedB, setSelectedB] = useState(false);
    const handleOnClick = (response) => {
        setSelectedB(!selectedB);
        response();
    }

    return (
        <nav className="cmp-menu">
            <MenuButton text="Home" image={homeImg} selected={selected} callback={handleOnClick}/>
            <MenuButton text="Perfil" image={profile} selected={selected} callback={handleOnClick}/>
            {role === "Admin" ?
                <MenuButton text="Accesos" image={accesses} selected={selected} callback={handleOnClick}/> :
                <MenuButton text="Clientes" image={clients} selected={selected} callback={handleOnClick}/>}
            <MenuButton text="Logout" image={logout} selected={selected} callback={handleOnClick}/>
        </nav>
    )
}

MyMenu.prototype = {
    role: PropTypes.string.isRequired
}