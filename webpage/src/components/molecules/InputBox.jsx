import '../../styles/components.css';
import {useState} from "react";

const InputBox = (props) => {
    const { name, label, inputType, placeholder = "", errorMessage, ...inputProps } = props;
    const [focused, setFocused] = useState(false);
    const handleFocused = () => {
        setFocused(true);
    }

    return (
        <article className="molecule-inputBox">
            <label htmlFor={name}>{ label }</label>
            <input
                {...inputProps}
                type={inputType}
                id={name}
                onBlur={handleFocused}
                focused={focused.toString()}
                name={name}
                placeholder={placeholder}
            />
            {errorMessage && <div className={"error-message-form"}>
                <span>{errorMessage}</span>
            </div>}
        </article>
    )
}

export default InputBox;