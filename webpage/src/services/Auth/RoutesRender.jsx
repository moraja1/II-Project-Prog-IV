import ErrorPage from "../../components/error-page.jsx";
import {LoginForm} from "../../components/LoginForm.jsx";
import {RegisterForm} from "../../components/RegisterForm.jsx";
import {MainPage} from "../../components/MainPage.jsx";
import AppLayout from "../../components/AppLayout.jsx";
import MyHome from "../../components/MyHome.jsx";
import {ProfileForm} from "../../components/ProfileForm/ProfileForm.jsx";
import {ClientForm} from "../../components/ClientForm/ClientForm.jsx";
import SellsLayout from "../../components/SellsLayout.jsx";
import {ProductForm} from "../../components/ProductForm/ProductForm.jsx";
import {ServiceForm} from "../../components/ServiceForm.jsx";
import {InvoiceForm} from "../../components/InvoiceForm.jsx";
import {createBrowserRouter} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <section className="cmp-container error-page"><ErrorPage/></section>,
            children: [
            {
                path: "",
                element: <LoginForm />,
            },
            {
                path: "register",
                element: <RegisterForm />,
            },
        ]
    },
    {
        path: "/home",
        element: <ProtectedRoute ><AppLayout /></ProtectedRoute >,
        errorElement: <section className="cmp-container error-page"><ErrorPage/></section>,
        children: [
            {
                path: "",
                element: <MyHome />
            },
            {
                path: "profile",
                element: <ProfileForm  />,
            },
            {
                path: "clients",
                element: <ClientForm />,
            },
            {
                path: "sells",
                element: <SellsLayout />,
                children: [
                    {
                        path: "prods",
                        element: <ProductForm />,
                    },
                    {
                        path: "servs",
                        element: <ServiceForm />,
                    },
                ]
            },
            {
                path: "invoices",
                element: <InvoiceForm />,
            }
        ],
    },
]);