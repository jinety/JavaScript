const getFormValue = () => {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  
  alert(`First name: ${firstName}`);
  alert(`Last name: ${lastName}`);
}

const formSubmit = document.querySelector('form');
formSubmit.addEventListener('submit', getFormValue);