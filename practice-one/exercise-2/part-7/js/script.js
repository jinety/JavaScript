const createTable = () => {
    const inprow = document.getElementById('tableRow').value;
    const inpcol = document.getElementById('tableCol').value;

    for (let row = 0; row < parseInt(inprow, 10); row++) {
        const table = document.getElementById('table').insertRow(row);
        for (let column = 0; column < parseInt(inpcol, 10); column++) {
            const tableDisplay = table.insertCell(column);
            tableDisplay.innerHTML=`Row ${row} Column ${column}`; 
        }
    }
} 
const tableUpdateBtn = document.getElementById('tableUpdateBtn');
tableUpdateBtn.addEventListener('click', createTable);