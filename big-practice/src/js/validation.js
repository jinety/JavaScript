const EmailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

/**
  * Email check function is not valid
  *
  * @param {string} value - Comparative value
*/
const isValidEmail = (value) => (EmailRegex.test(value));

/**
 * Checks for an empty value
 *
 * @param {string} value - Comparative value
*/
const isEmpty = (value) => (!value);

export { isValidEmail, isEmpty };
