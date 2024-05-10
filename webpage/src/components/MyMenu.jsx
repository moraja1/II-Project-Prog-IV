import './components.css';
import MenuButton from "./molecules/MenuButton.jsx";
import PropTypes from "prop-types";
import { FaHome } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoPeopleCircle } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import {ROLES} from "../services/Constants.js";

//IMAGES
const homeImg = (<FaHome />)
const logout = (<RiLogoutBoxRFill />)
const profile = (<ImProfile />)
const accesses = (<IoPeopleCircle />)
const clients = (<FaMoneyCheckDollar />)
const invoices = (<FaFileInvoiceDollar />)
const product = (<FaHandHoldingUsd />)


export default function MyMenu({ role }) {
    //const [currentSelected, setCurrentSelected] = useState(0);

    let menu = [homeBtn, profileBtn];
    if(role === ROLES.ADMIN) menu.push(accessesBtn);
    else menu.push(clientsBtn, productBtn, invoiceBtn);
    menu.push(logoutBtn);

    return (
        <nav className="cmp-menu">
            {
                menu.map((menu, index) => (<MenuButton key={index} link={menu.} text={menu.text} image={menu.image} />))
            }
        </nav>
    )
}

MyMenu.propTypes = {
    role: PropTypes.string.isRequired
}