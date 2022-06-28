const changeTable = () => {
    const rows = document.getElementById('table').rows;

    let targetRow  = document.getElementById('rowNumber').value;
    let targetCol = document.getElementById('columnNumber').value;

    let text;
    if(rows[targetRow]) {
        let targetRowCells = rows[targetRow].cells;
        if(targetRowCells[targetCol]) {
            targetRowCells[targetCol].innerHTML = document.getElementById('cellContent').value;
            text = 'Successful';
        }
    } else {
        
    }
   
    document.getElementById("notification").innerHTML = text;
}

const changeContentBtn = document.getElementById('changeContentBtn');
changeContentBtn.addEventListener('click', changeTable);