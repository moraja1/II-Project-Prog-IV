import '../components.css';

export function PageHeader({ children }) {
    return (
        <>
            <div className="molecule-header">
                <h1>Facturas UNA</h1>
            </div>
            <div id="detail">
                {children}
            </div>
        </>
    );
}