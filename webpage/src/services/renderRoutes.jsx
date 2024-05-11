import React, {useContext} from "react";
import { Context } from "../App.jsx"
import {PageHeader} from "../components/molecules/Header.jsx";
import ErrorPage from "../components/error-page.jsx";
import {LoginForm} from "../components/LoginForm.jsx";
import {RegisterForm} from "../components/RegisterForm.jsx";
import AppLayout from "../components/AppLayout.jsx";

const RenderRoutes = () => {
    const [signIn, setSignIn] = useContext(Context);

    const fullRoutes = [
        {
            path: "/",
            element: <PageHeader />,
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
            element: <AppLayout />,
            errorElement: <ErrorPage />,
        },
    ];
}

export default RenderRoutes;