const changeTable = () => {
    const rows = document.getElementById('table').rows;

    let targetRow  = document.getElementById('rowNumber').value;
    let targetCol   = document.getElementById('columnNumber').value;

    let targetRowCells  = rows[targetRow].cells;

    targetRowCells[targetCol].innerHTML = document.getElementById('cellContent').value;
}

const changeContentBtn = document.getElementById('changeContentBtn');
changeContentBtn.addEventListener('click', changeTable);