const createTable = () => {
    const targetRow = document.getElementById('tableRow').value;
    const targetCol = document.getElementById('tableCol').value;

    for (let row = 0; row < parseInt(targetRow, 10); row++) {
        const table = document.getElementById('table').insertRow(row);

        for (let column = 0; column < parseInt(targetCol, 10); column++) {
            const tableDisplay = table.insertCell(column);
            tableDisplay.innerHTML=`Row ${row} Column ${column}`; 
        }
    }
} 

const tableCreateBtn = document.getElementById('tableCreateBtn');
tableCreateBtn.addEventListener('click', createTable);