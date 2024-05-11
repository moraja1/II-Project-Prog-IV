import MenuButton from "./molecules/MenuButton.jsx";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { AiFillTool } from "react-icons/ai";

const prodImg  = (<RiShoppingBag4Fill />)
const servImg  = (<AiFillTool />)

const prodBtn = {link: "prods",    text: "Productos",     image: prodImg}
const servBtn = {link: "servs",    text: "Servicios",     image: servImg}

export default function SellsMenu() {
    let menu = [prodBtn, servBtn];

    return (
        <nav className="cmp-sells-menu">
            {
                menu.map((menu, index) => (
                    <MenuButton key={index}
                                link={menu.link} text={menu.text} image={menu.image}/>
                ))
            }
        </nav>
    )
}