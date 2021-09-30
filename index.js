// Variables I use

const plusBtn = document.getElementById("plus")
const addForm = document.getElementById("form")
const leftNavbar = document.getElementById("left-navbar")
addForm.style.display = "none"
const addProdact = document.getElementById("add-prodact")
const table = document.getElementsByTagName("table")[0]
const addRoommate = document.getElementById("add-roommate");
const radioDiv = document.getElementById("radio-inputs")




// set and get from local storage

if (JSON.parse(localStorage.getItem("roommates")) === null) {
    localStorage.setItem("roommates","[]")
}
let localStorageRoommates = JSON.parse(localStorage.getItem("roommates"))


if (JSON.parse(localStorage.getItem("tableRows")) === null) {
    localStorage.setItem("tableRows","[]")
}
let localStorageTablerows = JSON.parse(localStorage.getItem("tableRows"))


// Build the Dom
for(let shop of localStorageTablerows) {
    retriveShoppingList(shop)
}
retriveRoommates()
totalExpenses()



// eventlisteners!! 

plusBtn.addEventListener("click",()=> {
    if (addForm.style.display === "none") {
        plusBtn.style.transform = "rotate(45deg)"
        plusBtn.style.backgroundColor = "#ff6161"
        addForm.style.display = "block"
    }
    else {
        plusBtn.style.transform = ""
        addForm.style.display = "none"
        plusBtn.style.backgroundColor = "rgb(138, 224, 138)"
    }

})

addProdact.addEventListener("click",appendTr)

addRoommate.addEventListener("click", addNewRoommate)

document.body.addEventListener("contextmenu", (e) => {
    if(e.target.tagName === "LI" && e.target["id"] !== "add-roommate") {
        e.preventDefault();
        localStorageRoommates.splice(localStorageRoommates.indexOf(e.target.textContent), 1)
        removeRadio(e.target.textContent)
        removeTableRowByName(e.target.textContent)
        localStorage.setItem("roommates", JSON.stringify(localStorageRoommates))
        e.target.remove()
    }
})

document.body.addEventListener("mousedown", mousedown)

document.body.addEventListener("mouseup", MouseUp)

document.body.addEventListener("dblclick", removeTr)



// functions
function addNewRoommate() {
    inputName = document.createElement("li")
    inputName.innerHTML = "<input type='text' id='new-roommate'>"
    leftNavbar.insertBefore(inputName,leftNavbar.firstChild)
    document.getElementById("new-roommate").style.width = "70px"
    document.getElementById("new-roommate").style.backgroundColor = "rgba(209, 199, 199, 0.896)"
    document.getElementById("new-roommate").onblur = () => {
        if(document.getElementById("new-roommate").value === "") {
            alert("Roomate must have name 👻👻👻")
            inputName.remove()
        }
        else{
            inputName.textContent = document.getElementById("new-roommate").value
            localStorageRoommates.push(inputName.textContent)
            addRadio(inputName.textContent)
            localStorage.setItem("roommates", JSON.stringify(localStorageRoommates))
        }
    }

}

function appendTr() {
    const what = document.getElementById("what").value
    const who = document.querySelector('input[name="roommate"]:checked').value;
    const how = document.getElementById("how").value
    const newTr = {"what":what,"how":how,"who":who}
    retriveShoppingList(newTr)
    localStorageTablerows.push(newTr)
    localStorage.setItem("tableRows", JSON.stringify(localStorageTablerows))
}

function retriveRoommates() {
    for(let roommate of localStorageRoommates) {
        addRadio(roommate)
        const newLi = document.createElement("li")
        newLi.textContent = roommate
        leftNavbar.insertBefore(newLi,leftNavbar.firstChild)     
    }
}

function retriveShoppingList({what,how,who}) {
    const newRow = table.insertRow(table.length)


    const cel1 = newRow.insertCell(0);
    const cel2 = newRow.insertCell(1)
    const cel3 = newRow.insertCell(2)

    cel1.innerHTML = what;
    cel2.innerHTML = `${how}$`;
    cel3.innerHTML = who;

    totalExpenses()
    colorEven()
}

function addRadio(str) {
    document.getElementById("remove-me").style.display = "none"
    const radioInput = document.createElement("input")
    radioInput.type = "radio"
    radioInput.id = `radio-${str}`
    radioInput.name = `roommate`
    radioInput.value = str
    const label  = document.createElement("label")
    label.for = `radio-${str}`
    label.textContent = str
    radioDiv.appendChild(radioInput)
    radioDiv.appendChild(label)
}

function removeRadio(str) {
    for (let i of radioDiv.children) {
        if(i.value === str) {
            i.remove()
        }
    }
    for(let i of radioDiv.children) {
        if(i.textContent === str) {
            i.remove()
        }
    }
    if(radioDiv.children.length === 1){
        document.getElementById("remove-me").style.display = "block"
    }
}

function calculation() {
    const prices = []
    for (let i = 1; i<document.querySelectorAll("tr").length; i++) {
        if (document.querySelectorAll("tr")[i].style.display !== "none") {
            const price = document.querySelectorAll("tr")[i].children[1].textContent.slice(0,-1)
            prices.push(Number(price))
        }
    }
    return prices.reduce((a,b) => a + b, 0)  
}

function totalExpenses() {
    document.getElementById("total").textContent = `${calculation()}$`
}

function colorEven() {
    let counter = 1
    for(let tr of document.querySelectorAll("tr")) {
        if (counter % 2  === 0){
            tr.style.backgroundColor = "rgb(211, 211, 211)"
        }
        else {
            tr.style.backgroundColor = "rgb(235, 235, 235)"
        }
        counter++
    }
}

function mousedown(e) {
    if(e.target.tagName === "LI" && e.target["id"] !== "add-roommate"){
        for(let tr of document.querySelectorAll("tr")){
            if(tr.children[0].textContent !== "What did you buy?"){
                if (tr.children[2].textContent !== e.target.textContent) {
                    tr.style.display = "none"
                }
            }
        }
        totalExpenses()
    }
}

function MouseUp(e) {
    if(e.target.tagName === "LI" && e.target["id"] !== "add-roommate"){
        for(let tr of document.querySelectorAll("tr")) {
            tr.style.display = ""
        }
    }
    totalExpenses()
}

function removeTr(e) {
    if (e.target.tagName === "TD") {
        e.target.parentElement.remove()
    }
    totalExpenses()
    watchTable()
}

function watchTable() {
    let tableRow  = []
    for (let i = 1; i<document.querySelectorAll("tr").length; i++) {
        if (document.querySelectorAll("tr")[i].style.display !== "none") {
            tableRow.push({"what":document.querySelectorAll("tr")[i].children[0].textContent, "how":document.querySelectorAll("tr")[i].children[1].textContent.slice(0,-1),"who":document.querySelectorAll("tr")[i].children[2].textContent})
        }
    }
    localStorageTablerows = tableRow
    localStorage.setItem("tableRows", JSON.stringify(localStorageTablerows))
}

function removeTableRowByName(str) {
    for(let tr of document.querySelectorAll("tr")){
        if (tr.children[2].textContent === str) {
            tr.remove()
        }
    }
    totalExpenses()
    watchTable()
}








