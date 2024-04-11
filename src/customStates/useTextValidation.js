import { useState } from "react";

/**
 * @param {string} initial
 * @param {RegExp?} regex
 */
export default function useValidatedText(initial, regex = null) {
    const [text, setText] = useState(initial);
    /** @type {[Validation, function]} */
    const [validation, setValidation] = useState({ isValid: true });
    const [customValidator, setCustomValidator] = useState({
        /** @type {ValidationFn} */ validate(value, reject) {},
    });

    /** @param {string} reason */
    function reject(reason) {
        setValidation({ isValid: false, reason });
    }

    /** @param {ValidationFn} validator */
    function defineCustomValidation(validator) {
        setCustomValidator({ validate: validator });
    }

    async function validate() {
        if (regex) {
            const isPatternValid = regex.test(text);
            if (!isPatternValid) {
                reject("Pattern invalid");
                return validation;
            }
        }
        await customValidator.validate(text, reject);
        return validation;
    }

    return {
        get text() {
            return text;
        },
        setText,
        defineCustomValidation,
        validate,
        get isValid() {
            return validation.isValid;
        },
        get errorMessage() {
            if (!this.isValid){
                return validation.reason;
            }
        },
    };
}

/**
 * @typedef {(value: string, reject:(reason:string) => void) => void | Promise<void>} ValidationFn
 */
/**
 * @typedef {{isValid:boolean, reason?: string}} Validation
 */
