import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {PageHeader} from "./components/molecules/Header.jsx";
import ErrorPage from "./components/error-page.jsx";
import {LoginForm} from "./components/LoginForm.jsx";
import {RegisterForm} from "./components/RegisterForm.jsx";
import React from "react";
import AppLayout from "./components/AppLayout.jsx";
import MyTable from "./components/MyTable.jsx";
import MyHome from "./components/MyHome.jsx";
import {ProfileForm} from "./components/ProfileForm.jsx";
import {ClientForm} from "./components/ClientForm.jsx";
import SellsLayout from "./components/SellsLayout.jsx";
import {ProductForm} from "./components/ProductForm.jsx";
import {ServiceForm} from "./components/ServiceForm.jsx";

export const Context = React.createContext();

const user = {
    "id": 1,
    "naturalId": "202220222",
    "password": "oW0kAA91qF",
    "name": "Dana",
    "lastName": "Lisett",
    "mobile": "9636350406",
    "email": "dlisett0@intel.com",
    "enabled": 0,
    "type": "Physical",
    "role": "Supplier"
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <>
                    <PageHeader />
                    <Outlet />
                </>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <LoginForm />,
            },
            {
                path: "register",
                element: <RegisterForm />,
            },
        ],
    },
    {
        path: "/home",
        element: <AppLayout role={user.role}/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element:
                    <MyHome user={user}>
                        <MyTable />
                    </MyHome>,
            },
            {
                path: "profile",
                element: <ProfileForm user={user} />,
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
        ],
    }
]);

function App() {
    const [signIn, setSignIn] = React.useState(true);

    return (
        <Context.Provider value={{signIn, setSignIn}}>
                <RouterProvider router={router}/>
        </Context.Provider>
    )
}

export default App;