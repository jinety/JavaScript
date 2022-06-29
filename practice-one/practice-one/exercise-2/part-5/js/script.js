const insertRow = () => {
  const table = document.getElementById('sampleTable');
  let row = table.insertRow(0);
  let cellLeft = row.insertCell(0);
  let cellRight = row.insertCell(1);

  cellLeft.innerHTML = "NEW CELL1";
  cellRight.innerHTML = "NEW CELL2";
}

const addRowButton = document.querySelector('.add-row-button');

addRowButton.addEventListener('click', insertRow);
