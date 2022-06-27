const removeItem = () => {
  let colorSelection = document.getElementById('colorSelect');
  colorSelection.remove(colorSelection.selectedIndex);
}

const removeFromBtn = document.querySelector('.item-remove-btn');
removeFromBtn.addEventListener('click', removeItem);
