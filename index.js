const plusBtn = document.getElementById("plus")
const addForm = document.getElementById("form")
// const what = document.getElementById("what").value
// const who = document.getElementById("who").value
// const how = document.getElementById("how").value
addForm.style.display = "none"


const addProdact = document.getElementById("add-prodact")
const table = document.getElementsByTagName("table")[0]


plusBtn.addEventListener("click",()=> {
    if (addForm.style.display === "none") {
        plusBtn.textContent = "x"
        addForm.style.display = "block"
    }
    else {
        plusBtn.textContent = "+"
        addForm.style.display = "none"
    }

})


addProdact.addEventListener("click",appendTr)


function appendTr() {
    const what = document.getElementById("what").value
    const who = document.getElementById("who").value
    const how = document.getElementById("how").value


    const newRow = table.insertRow(table.length)


    const cel1 = newRow.insertCell(0);
    const cel2 = newRow.insertCell(1)
    const cel3 = newRow.insertCell(2)

    cel1.innerHTML = what;
    cel2.innerHTML = `${how}$`;
    cel3.innerHTML = who;

    if (who  === "Amit") newRow.style.backgroundColor = "red"
    if (who === "Maya") newRow.style.backgroundColor = "blue"
}
