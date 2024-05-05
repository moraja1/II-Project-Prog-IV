import { PropTypes } from "prop-types";
import '../components.css';

export function InputBox({ field, inputType, isRequiredProp, customPlaceholder = "" }) {
    return (
        <article className="molecule-inputBox">
            <label htmlFor={field}>{ field }</label>
            <input
                type={inputType}
                id={field}
                name={field}
                placeholder={customPlaceholder}
                required={isRequiredProp}/>
        </article>
    )
}

InputBox.propTypes = {
    field: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    isRequiredProp: PropTypes.bool.isRequired,
    customPlaceholder: PropTypes.string
}