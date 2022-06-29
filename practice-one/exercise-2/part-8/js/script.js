const removeItem = () => {
  let colorSelection = document.getElementById('colorSelect');

  colorSelection.remove(colorSelection.selectedIndex);
}

const removeFromBtn = document.getElementById('itemRemoveBtn');

removeFromBtn.addEventListener('click', removeItem);
