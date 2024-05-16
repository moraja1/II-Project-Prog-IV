import '../styles/components.css';
import MenuButton from "./molecules/MenuButton.jsx";
import { FaHome } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import {ROLES} from "../services/Constants.js";

//IMAGES
const homeImg = (<FaHome />)
const logout  = (<RiLogoutBoxRFill />)
const profile = (<ImProfile />)
const clients = (<FaMoneyCheckDollar />)
const invoices= (<FaFileInvoiceDollar />)
const product = (<FaHandHoldingUsd />)

const homeBtn = {link: "/home",    text: "Home",     image: homeImg}
const profBtn = {link: "profile",  text: "Perfil",   image: profile}
const clieBtn = {link: "clients",  text: "Clientes", image: clients}
const prodBtn = {link: "sells",    text: "Ventas",   image: product}
const invoBtn = {link: "invoices", text: "Facturas", image: invoices}
const logoBtn = {link: "/",        text: "Logout",   image: logout}


export default function MainMenu({ role }) {
    let menu = [homeBtn, profBtn];
    if(role === ROLES.SUPPLIER.ENGLISH) menu.push(clieBtn, prodBtn, invoBtn);
    menu.push(logoBtn);

    return (
        <nav className="cmp-main-menu">
            {
                menu.map((menu, index) => (
                    <MenuButton key={index}
                                link={menu.link} text={menu.text} image={menu.image} />
                ))
            }
        </nav>
    )
}