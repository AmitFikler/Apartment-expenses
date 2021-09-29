const plusBtn = document.getElementById("plus")
const addForm = document.getElementById("form")
const leftNavbar = document.getElementById("left-navbar")
addForm.style.display = "none"
const addProdact = document.getElementById("add-prodact")
const table = document.getElementsByTagName("table")[0]
const addRoommate = document.getElementById("add-roommate");
const radioDiv = document.getElementById("radio-inputs")





if (JSON.parse(localStorage.getItem("roommates")) === null) {
    localStorage.setItem("roommates","[]")
}
let localStorageRoommates = JSON.parse(localStorage.getItem("roommates"))


if (JSON.parse(localStorage.getItem("tableRows")) === null) {
    localStorage.setItem("tableRows","[]")
}
let localStorageTablerows = JSON.parse(localStorage.getItem("tableRows"))

retriveRoommates()


plusBtn.addEventListener("click",()=> {
    if (addForm.style.display === "none") {
        plusBtn.textContent = "x"
        plusBtn.style.backgroundColor = "#ff6161"
        addForm.style.display = "block"
    }
    else {
        plusBtn.textContent = "+"
        addForm.style.display = "none"
        plusBtn.style.backgroundColor = "rgb(138, 224, 138)"
    }

})


addProdact.addEventListener("click",appendTr)


addRoommate.addEventListener("click", addNewRoommate)

document.body.addEventListener("contextmenu", (e) => {
    if(e.target.tagName === "LI") {
        e.preventDefault();
        localStorageRoommates.splice(localStorageRoommates.indexOf(e.target.textContent), 1)
        localStorage.setItem("roommates", JSON.stringify(localStorageRoommates))
        e.target.remove()
    }
})


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


    const newRow = table.insertRow(table.length)


    const cel1 = newRow.insertCell(0);
    const cel2 = newRow.insertCell(1)
    const cel3 = newRow.insertCell(2)

    cel1.innerHTML = what;
    cel2.innerHTML = `${how}$`;
    cel3.innerHTML = who;

    localStorageTablerows.push({"what":what,"how":how,"who":who})
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

function addRadio(str) {
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






