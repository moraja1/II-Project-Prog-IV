import '../components.css';

const SelectBox = (props) => {
    const { name, label, ...inputProps } = props;

    return (
        <div className="molecule-selectBox">
            <label htmlFor={name}>{label}</label>
            <select
                {...inputProps}
                id={name}
                name={name}
                defaultValue={"seleccione una opción"}>
                {props.children}
            </select>
        </div>

    )
}

export default SelectBox;