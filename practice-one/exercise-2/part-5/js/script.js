const insertRow = () => {
  const table = document.getElementById('sampleTable')
  let row = table.insertRow(0);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";
}

const addRowButton = document.querySelector('input');
addRowButton.addEventListener('click', insertRow);
