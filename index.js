const plusBtn = document.getElementById("plus")
const addForm = document.getElementById("form")
const leftNavbar = document.getElementById("left-navbar")
addForm.style.display = "none"
const addProdact = document.getElementById("add-prodact")
const table = document.getElementsByTagName("table")[0]
const addRoommate = document.getElementById("add-roommate");




if (JSON.parse(localStorage.getItem("roommates")) === null) {
    localStorage.setItem("roommates","[]")
}
localStorageRoommates = JSON.parse(localStorage.getItem("roommates"))
retriveRoommates()


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
            localStorage.setItem("roommates", JSON.stringify(localStorageRoommates))
        }
    }

}

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
}



function retriveRoommates() {
    for(let roommate of localStorageRoommates) {
        const newLi = document.createElement("li")
        newLi.textContent = roommate
        leftNavbar.insertBefore(newLi,leftNavbar.firstChild)     
    }
}



