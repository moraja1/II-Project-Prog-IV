import { PropTypes } from "prop-types";
import '../components.css';

export function InputBox({ field, isRequiredProp }) {
    return (
        <article className="common-inputBox">
            <label htmlFor={field}></label>
            <input
                type={PropTypes}
                id={field}
                name={field}
                required={isRequiredProp}/>
        </article>
    )
}

InputBox.propTypes = {
    field: PropTypes.string.isRequired,
    isRequiredProp: PropTypes.bool.isRequired,
}