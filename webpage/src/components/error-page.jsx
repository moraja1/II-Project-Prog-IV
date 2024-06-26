import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-message">
            <h1>Oops!</h1>
            <p>No tienes permiso para acceder a esta página.</p>
        </div>

    );
}