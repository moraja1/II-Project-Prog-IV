import './components.css';
import MenuButton from "./molecules/MenuButton.jsx";
import { PropTypes } from "prop-types";
import { FaHome } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoPeopleCircle } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import {useEffect, useState} from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import {ROLES as ROLE, WINDOWS} from "../services/Constants.js";




//IMAGES
const homeImg = (<FaHome />)
const logout = (<RiLogoutBoxRFill />)
const profile = (<ImProfile />)
const accesses = (<IoPeopleCircle />)
const clients = (<FaMoneyCheckDollar />)
const invoices = (<FaFileInvoiceDollar />)
const product = (<FaHandHoldingUsd />)

//BUTTONS
const homeBtn = {
    text: "Home",
    image: homeImg,
    name: WINDOWS.HOME
}
const profileBtn = {
    text: "Perfil",
    image: profile,
    name: WINDOWS.PROFILE
}
const accessesBtn = {
    text: "Accesos",
    image: accesses,
    name: WINDOWS.ACCESSES
}
const clientsBtn = {
    text: "Clientes",
    image: clients,
    name: WINDOWS.CLIENTS
}
const productBtn = {
    text: "Productos",
    image: product,
    name: WINDOWS.PRODUCTS
}
const invoiceBtn = {
    text: "Facturas",
    image: invoices,
    name: WINDOWS.INVOICES
}
const logoutBtn = {
    text: "Logout",
    image: logout
}


export default function MyMenu({ role, updatePage }) {
    //const [currentSelected, setCurrentSelected] = useState(0);

    let menu = [homeBtn, profileBtn];
    if(role === ROLE.ADMIN) menu.push(accessesBtn);
    else menu.push(clientsBtn, productBtn, invoiceBtn);
    menu.push(logoutBtn);
    const [selected, setSelected] = useState(Array(menu.length).fill(true, 0, 1).fill(false, 1));

    const updateElement = (index) => {
        let newSelectedState = Array(selected.length).fill(false);
        newSelectedState[index] = true;
        setSelected(newSelectedState)
    }

    useEffect(() => {
        updatePage(name);
    }, [selected]);

    return (
        <nav className="cmp-menu">
            {
                menu.map((menu, index) => (
                    <MenuButton key={index} index={index} updateElement={updateElement} text={menu.text} image={menu.image} selected={selected[index]} />
                ))
            }
        </nav>
    )
}

MyMenu.propTypes = {
    role: PropTypes.string.isRequired,
    updatePage: PropTypes.func.isRequired,
}