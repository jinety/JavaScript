// Query elements
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const salaryInput = document.getElementById('salary');
const cityInput = document.getElementById('city');
const submitBtn = document.getElementById('submitBtn');
const userTableBody = document.getElementById('userTableBody');
const userApi = 'http://localhost:3000/users';

// Regex for validating a value/text format
const REGEX = {
  alphabetShortRegex: /^[A-Za-z\s]+$/,
  emailRegex: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

// Messages
const MESSAGES = {
  empty: 'Value should be not empty',
  wrongFormat: 'Enter the wrong format. Please re-enter'
};

const EmptyText = '';

/**
 * Display error message when user enters wrong input
 * 
 * @param {HtmlInputElement} input - Input element
 * @param {string} msg - Show message
 */
const showErrorMessage = (input, msg) => {
  const errMessageEl = input.parentElement.querySelector('.warn-msg');
  errMessageEl.innerHTML = msg;
}

/**
 * Function that checks for an empty value
 * 
 * @param {string} value - Comparative value
 */
const isEmpty = (value) => {
  if (!value) {
    return true;
  } 

  return false;
}

const isInvalidName = (value) => {
  if (!REGEX.alphabetShortRegex.test(value)) {
    return true;
  }

  return false;
}

/**
 * Email check function is not valid
 * 
 * @param {string} value - Comparative value
 */
const isInvalidEmail = (value) => {
  if (!REGEX.emailRegex.test(value)) {
    return true;
  }

  return false;
}

/**
 * Check salary less than or equal to 0
 * 
 * @param {number} value - Salary value
 */
const isInvalidSalary = (value) => {
  if (value <= 0) {
    return true;
  } 

  return false;
}

/**
 * Validate form data
 */
const isValidForm = () => {
  const nameValue = fullNameInput.value;
  const emailValue = emailInput.value;
  const salaryValue = salaryInput.value;
  const cityValue = cityInput.value;
  let isValid = true;

  // Full name is required
  if (isEmpty(nameValue)) {
    isValid = false;
    showErrorMessage(fullNameInput, MESSAGES.empty);
  } else if (isInvalidName(nameValue)) {
    // Full name is not in the correct format
    isValid = false;
    showErrorMessage(fullNameInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(fullNameInput, EmptyText);
  }
  
  // Email is required
  if (isEmpty(emailValue)) {
    isValid = false;
    showErrorMessage(emailInput, MESSAGES.empty);
  } else if (isInvalidEmail(emailValue)) {
    // Email is not in the correct format
    isValid = false;
    showErrorMessage(emailInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(emailInput, EmptyText);
  }

  // Salary is required
  if (isEmpty(salaryValue)) {
    isValid = false;
    showErrorMessage(salaryInput, MESSAGES.empty);
  } else if (isInvalidSalary(salaryValue)) {
    // Salary less than or equal to 0
    isValid = false;
    showErrorMessage(salaryInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(salaryInput, EmptyText);
  }

  // City is required
  if (isEmpty(cityValue)) {
    isValid = false;
    showErrorMessage(cityInput, MESSAGES.empty);
  } else if (isInvalidName(cityValue)) {
    // City name is not in the correct format
    isValid = false;
    showErrorMessage(cityInput, MESSAGES.wrongFormat);
  } else {
    // City name in correct format
    showErrorMessage(cityInput, EmptyText);
  }

  return isValid;
}

/**
 * Function POST data to userDatabase 
 */
 const createUser = (data) => {
  // POST method implementation
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch(userApi, options)
    // Parses JSON response into native JavaScript objects 
    .then((response) => response.json())
    // Show error message when API call is wrong
    .catch((error) => alert('An error occurred while creating user', error));
}

/**
 * Function handle create form
 */
const handleCreateForm = () => {
  const name = fullNameInput.value;
  const email = emailInput.value;
  const salary = salaryInput.value;
  const city = cityInput.value;
  const formData = {name, email, salary, city};
    
  createUser(formData); 
}

/**
 * The function takes data from the API and displays it on a table in HTML
 */
const renderUserTable = () => {
  fetch(userApi)
    // Parses JSON response into native JavaScript objects 
    .then((response) => response.json())
    .then((users) => {
      let tableTemplate = '';

      users.forEach(user => {
        tableTemplate += ` 
          <tr class="content-row">
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.salary}</td>
            <td>${user.city}</td>
            <td class="td-btn">
              <button type="button" class="delete-button" data-id=${user.id}>Delete</button>
              <button type="button" class="update-button" data-id=${user.id}>Update</button>
            </td>
          </tr>
        `;
      });

      userTableBody.innerHTML = tableTemplate;
      const deleteButtons = document.querySelectorAll('.delete-button');
      const updateButtons = document.querySelectorAll('.update-button');

      // Iterate over each delete button in the deleteButtons array
      deleteButtons.forEach((item) => {
        item.addEventListener('click', () => {
          deleteUser(item);
        })
      })

      updateButtons.forEach((item) => {
        item.addEventListener('click', () => {
          updateUser(item);
          
          
        })
      })
    })
    .catch((error) => alert('An error occurred while getting user', error));
}

/**
 * Function to remove user from json server
 */
const deleteUser = (item) => {
  // DELETE method implementation
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const userId = item.dataset.id;

  fetch(userApi + '/' + userId, options)
    .then()
    .catch((error) => alert('An error occurred while removing user', error));
}

const updateUser = (item) => {
  // Get the id of the update button when clicked
  const userId = item.dataset.id;
  const objects = {
    method: 'GET'
  }
  fetch (userApi + '/' + userId, objects)
    .then((response) => response.json())
    .then(data => {
      fullNameInput.value = data.name;
      emailInput.value = data.email;
      salaryInput.value = data.salary;
      cityInput.value = data.city;
    })
    .catch((error) => alert('Error! An error occurred.', error));
}

const submitForm = () => {
  if (isValidForm()) {
    handleCreateForm();
  }
}

submitBtn.addEventListener('click', submitForm);
renderUserTable();
