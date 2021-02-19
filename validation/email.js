const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function emailValidation(email) {
    let errors = {};    // holds errors

    // Convert empty fields to an empty string so we can use validator functions
    email = !isEmpty(email) ? email : "";

    // Email checks
    if (validator.isEmpty(email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }

    return errors;
}