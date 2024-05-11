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
                {/*{options.map((opt, index) => (
                    <option key={index} value={opt.value}>{opt.value}</option>
                ))}*/}
            </select>
        </div>

    )
}

export default SelectBox;