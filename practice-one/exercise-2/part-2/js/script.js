const getFormValue = () => {
  let firstName = document.getElementById('firstName').value;
  alert(`First name: ${firstName}`);
  let lastName = document.getElementById('lastName').value;
  alert(`Last name: ${lastName}`);
}

const formSubmit = document.querySelector('form');
formSubmit.addEventListener('submit', getFormValue);