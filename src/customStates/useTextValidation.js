import { useState } from "react";

/**
 * @param {string} initial
 * @param {RegExp?} regex
 */
export default function useValidatedText(
    initial,
    regex = null,
    regexMessage = "Pattern invalid"
) {
    const [text, setText] = useState(initial);
    /** @type {[Validation, function]} */
    const [validation, setValidation] = useState({ isValid: true });
    const customValidator = {
        /** @type {ValidationFn} */ validate(value, reject) {},
    };

    /** @param {string} reason */
    function reject(reason) {
        setValidation({ isValid: false, reason });
    }

    function reset() {
        setValidation({ isValid: true });
    }

    /** @param {ValidationFn} validator */
    function defineCustomValidation(validator) {
        customValidator.validate = validator;
    }

    function validate() {
        reset();
        if (regex) {
            const isPatternValid = regex.test(text);
            if (!isPatternValid) {
                reject(regexMessage);
                return validation;
            }
        }
        customValidator.validate(text, reject);
        return validation;
    }

    return {
        get text() {
            return text;
        },
        setText(text) {
            setText(text);
        },
        defineCustomValidation,
        validate,
        get isValid() {
            return validation.isValid;
        },
        get errorMessage() {
            if (!this.isValid) {
                return validation.reason;
            }
        },
    };
}

/**
 * 
 * @param  {...ReturnType<useValidatedText>} fields 
 * @returns {boolean} is valid?
 */
export function validateRequiredFields(...fields){
    return fields.reduce((allValid, field)=> {
        if (!field.text){
            field.validate();
            return false;
        }
        return allValid && field.isValid
    }, true);
}

/**
 * @typedef {(value: string, reject:(reason:string) => void) => void } ValidationFn
 */
/**
 * @typedef {{isValid:boolean, reason?: string}} Validation
 */
