import { Messages } from "../constants/message.constant";

export class Validation {
  constructor() {
    this.EmailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    this.Empty = "";
  }

  isValidEmail(value) {
    if (this.EmailRegex.test(value)) {
      return false;
    }

    return true;
  }

  isEmpty(value) {
    if (value === this.Empty) {
      return true;
    }

    return false;
  }

  validateForm(data, config) {
    const formValidation = {
      isValid: true,
      errors: {},
    };

    // Point to the key in the data object
    Object.keys(data).forEach((key) => {
      const value = data[key];

      // There is a key in the config
      if (config[key]) {
        config[key].forEach((validationType) => {
          // If there is an empty word, continue to consider the isEmpty condition
          if (validationType === "empty" && this.isEmpty(value)) {
            formValidation.isValid = false;
            formValidation.errors[key] = Messages.empty;
            return;
          }

          // If there is an format word, continue to consider the isValidEmail condition
          if (validationType === "formatEmail" && this.isValidEmail(value)) {
            formValidation.isValid = true;
            formValidation.errors[key] = Messages.emailWrongFormat;
          }

          formValidation.errors[key] = Messages.EMPTY_TEXT;
        });
      }

      console.log(formValidation);
    });

    return formValidation;
  }
}
