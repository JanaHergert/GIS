document.getElementById("add").addEventListener("click", addElement);

let lists = [];
let currentListIndex = 0;

function addElement() {
    let input = document.getElementById("myInput").value;
    if (input === '') {
        alert("Bitte gib etwas ein!");
        return;
    }

    let ul = document.getElementById("myUL");
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        if (this.checked) {
            li.style.textDecoration = "line-through";
        } else {
            li.style.textDecoration = "none";
        }
    });
    li.appendChild(checkbox);

    let text = document.createTextNode(input);
    li.appendChild(text);

    let trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash fa-xs";
    trashIcon.style.color = "#008b8b";
    trashIcon.style.cursor = "pointer";
    trashIcon.addEventListener("click", function() {
        ul.removeChild(li);
        lists[currentListIndex].items = lists[currentListIndex].items.filter(item => item !== input);
    });
    li.appendChild(trashIcon);

    ul.appendChild(li);
    document.getElementById("myInput").value = "";

    lists[currentListIndex].items.push(input);
}

document.getElementById("newListButton").addEventListener("click", addNewList);
document.getElementById("myLists").addEventListener("click", showLists);

function addNewList() {
    let title = prompt("Bitte gib den Titel der neuen Liste ein:");
    if (title === null || title.trim() === "") {
        alert("Kein gültiger Titel eingegeben.");
        return;
    }

    let rightColumn = document.querySelector(".right");
    rightColumn.style.display = "none";

    let newList = {
        title: title,
        items: []
    };
    lists.push(newList);
    currentListIndex = lists.length - 1;

    let newCenterColumn = document.createElement("div");
    newCenterColumn.className = "center";
    newCenterColumn.innerHTML = `
        <span>
            <h2 contenteditable="true" onblur="updateTitle(this)">${title}</h2> 
            <i class="fa-solid fa-print" onclick="showPrintOptions()"></i>
            <i class="fa-solid fa-xmark" onclick="clearList()"></i>
        </span>
        <div class="input-container">
            <input type="text" placeholder="Das fehlt noch..." class="new-input">
            <button class="add" onclick="addNewElement(this)">Ok</button>
        </div>
        <ul class="new-ul"></ul>
    `;
    document.querySelector(".column").appendChild(newCenterColumn);
}

function addNewElement(button) {
    let input = button.previousElementSibling.value;
    if (input === '') {
        alert("Bitte gib etwas ein!");
        return;
    }

    let ul = button.parentNode.nextElementSibling;
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        if (this.checked) {
            li.style.textDecoration = "line-through";
        } else {
            li.style.textDecoration = "none";
        }
    });
    li.appendChild(checkbox);

    let text = document.createTextNode(input);
    li.appendChild(text);

    let trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash fa-xs";
    trashIcon.style.color = "#008b8b";
    trashIcon.style.cursor = "pointer";
    trashIcon.addEventListener("click", function() {
        ul.removeChild(li);
    });
    li.appendChild(trashIcon);

    ul.appendChild(li);
    button.previousElementSibling.value = "";
}

function showLists() {
    let leftColumn = document.querySelector(".left");
    let listContainer = document.createElement("div");
    listContainer.className = "list-container";

    lists.forEach((list, index) => {
        let listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.textContent = list.title;
        listItem.addEventListener("click", function() {
            showList(index);
        });
        listContainer.appendChild(listItem);
    });

    leftColumn.appendChild(listContainer);
}

function showList(index) {
    currentListIndex = index;
    let list = lists[index];
    let centerColumn = document.querySelector(".center");
    centerColumn.innerHTML = `
        <span>
            <h2 contenteditable="true" onblur="updateTitle(this)">${list.title}</h2> 
            <i class="fa-solid fa-print" onclick="showPrintOptions()"></i>
            <i class="fa-solid fa-xmark" onclick="clearList()"></i>
        </span>
        <div class="input-container">
            <input type="text" id="myInput" placeholder="Das fehlt noch...">
            <button id="add" class="add">Ok</button>
        </div>
        <ul id="myUL"></ul>
    `;
    
    document.getElementById("add").addEventListener("click", addElement);
    
    let ul = document.getElementById("myUL");
    list.items.forEach(item => {
        let li = document.createElement("li");
    
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                li.style.textDecoration = "line-through";
            } else {
                li.style.textDecoration = "none";
            }
        });
        li.appendChild(checkbox);
    
        let text = document.createTextNode(item);
        li.appendChild(text);
    
        let trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash fa-xs";
        trashIcon.style.color = "#008b8b";
        trashIcon.style.cursor = "pointer";
        trashIcon.addEventListener("click", function() {
            ul.removeChild(li);
            list.items = list.items.filter(i => i !== item);
        });
        li.appendChild(trashIcon);
    
        ul.appendChild(li);
    });
}

function updateTitle(element) {
    lists[currentListIndex].title = element.textContent;
}
function clearList() {
    let ul = document.getElementById("myUL");
    ul.innerHTML = ""; // Leere die Liste

    let titleElement = document.querySelector('.center h2');
    titleElement.textContent = "Reise nach XY"; // Setze die Überschrift zurück

    lists[currentListIndex].items = []; // Leere auch die Liste im Speicher
}


function resetCenterColumn() {
    let centerColumn = document.querySelector('.center');
    centerColumn.innerHTML = `
        <span>
            <h2 contenteditable="true" onblur="updateTitle(this)">Reise nach XY</h2> 
            <i class="fa-solid fa-print" onclick="showPrintOptions()"></i>
            <i class="fa-solid fa-xmark" onclick="clearList()"></i>
        </span>
        <div class="input-container">
            <input type="text" id="myInput" placeholder="Das fehlt noch...">
            <button id="add" class="add">Ok</button>
        </div>
        <ul id="myUL"></ul>
    `;
    document.getElementById("add").addEventListener("click", addElement);
}

function resetRightColumn() {
    let rightColumn = document.querySelector('.right');
    rightColumn.style.display = "block";
}

function showPrintOptions() {
    let popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
        <h2>Meine Packliste ausdrucken</h2>
        <label for="printerSelect">Verfügbare Drucker:</label>
        <select id="printerSelect">
            <option>Mein Drucker</option>
        </select>
        <button onclick="closePopup()">Drucken</button>
        <button onclick="closePopup()">Schließen</button>
    `;
    document.body.appendChild(popup);
}

function closePopup() {
    let popup = document.querySelector(".popup");
    if (popup) {
        document.body.removeChild(popup);
    }
}
