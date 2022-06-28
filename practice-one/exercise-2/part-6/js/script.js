const changeTable = () => {
    const rows = document.getElementById('table').rows;

    let targetRow  = document.getElementById('rowNumber').value;
    let targetCol   = document.getElementById('columnNumber').value;

    let text;
    if(targetRow >= 0 && targetRow <= 2 && targetCol >= 0 && targetCol <= 1) {
        let targetRowCells = rows[targetRow].cells;
        targetRowCells[targetCol].innerHTML = document.getElementById('cellContent').value;
        text = 'Successful';
        
    } else {
        text = 'Failure!!! Please re-enter';
    }
   
    document.getElementById("notification").innerHTML = text;
}

const changeContentBtn = document.getElementById('changeContentBtn');
changeContentBtn.addEventListener('click', changeTable);