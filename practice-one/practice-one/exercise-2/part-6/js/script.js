const changeTable = () => {
    const rows = document.getElementById('table').rows;
    const targetRow  = document.getElementById('rowNumber').value;
    const targetCol = document.getElementById('columnNumber').value;
    let text;

    if(rows[targetRow]) {
        const targetRowCells = rows[targetRow].cells;
        if(targetRowCells[targetCol]) {
            targetRowCells[targetCol].innerHTML = document.getElementById('cellContent').value;
            text = 'Successful';
        } else {
            text = 'Incorrect, please re-enter';
        } 
    } else {
        text = 'Incorrect or missing input, please re-enter';
    } 
    document.getElementById("notification").innerHTML = text;
}

const changeContentBtn = document.getElementById('changeContentBtn');

changeContentBtn.addEventListener('click', changeTable);