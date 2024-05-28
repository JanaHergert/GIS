window.addEventListener("load", addHeaderFooter);
function addHeaderFooter() {
    // header + footer
    let h = document.createElement("div");
    let f = document.createElement("div");
    h.innerHTML = `
<h1>Meine Packliste</h1>
`;
    document.querySelector("header").appendChild(h);
    f.innerHTML = `
<h1>Gute Reise!</h1>
        <i class="fas fa-solid fa-plane fa-2xl" style="color: white;"></i>
        `;
    document.querySelector("footer").appendChild(f);
};


let ul = document.getElementById("myUL");




// add = ok button in class center
if(document.getElementById("add")){
    document.getElementById("add").addEventListener("click", addElement);

}

let lists = [];
let currentListIndex = 0;

//add element to center list
function addElement() {
    let input = document.getElementById("myInput").value;
    if (input === '') {
        alert("Bitte gib etwas ein!");
        return;
    }
    // print needs myUL
    let li = document.createElement("li");

    // checkbox for list item + checked state
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            li.style.textDecoration = "line-through";
        } else {
            li.style.textDecoration = "none";
        }
    });
    li.appendChild(checkbox);

    // list item text
    let text = document.createTextNode(input);
    li.appendChild(text);

    // list item trash icon + delete function
    let trashIcon = document.createElement("i");
    trashIcon.className = "fas fa-solid fa-trash fa-xs";
    trashIcon.style.color = "#008b8b";
    trashIcon.style.cursor = "pointer";
    trashIcon.addEventListener("click", function () {
        ul.removeChild(li);
        lists[currentListIndex].items = lists[currentListIndex].items.filter(item => item !== input);
    });
    li.appendChild(trashIcon);

    ul.appendChild(li);
    document.getElementById("myInput").value = "";

    lists[currentListIndex].items.push(input);
}






// newListButton = Neue Liste button in class right
if(document.getElementById("newListButton")){
document.getElementById("newListButton").addEventListener("click", addNewList);
}
if(document.getElementById("myLists")){
document.getElementById("myLists").addEventListener("click", showLists);
}

// alert for right list title
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

    let newRightColumn = document.createElement("div");
    newRightColumn.className = "right";
    newRightColumn.id = "rList";

    newRightColumn.innerHTML = `
    <span>
        <h2 contenteditable="true" onblur="updateTitle(this)">${title}</h2> 
        <i class="fas fa-solid fa-print" onclick="showPrintOptions()"></i>
        <i class="fa-regular fa-floppy-disk" style="color: #008b8b;"></i>
        <i class="fas fa-solid fa-xmark" onclick="resetRightColumn();"></i>
    </span>
    <div class="input-container">
        <input type="text" placeholder="Das fehlt noch..." class="new-input">
        <button class="add" onclick="addNewElement(this)">Ok</button>
    </div>
    <ul class="new-ul"></ul>
`
    document.querySelector(".column").appendChild(newRightColumn);
}

// fill right list
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
    checkbox.addEventListener("change", function () {
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
    trashIcon.className = "fas fa-solid fa-trash fa-xs";
    trashIcon.style.color = "#008b8b";
    trashIcon.style.cursor = "pointer";
    trashIcon.addEventListener("click", function () {
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
        listItem.addEventListener("click", function () {
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
            <i class="fas fa-solid fa-print" onclick="showPrintOptions()"></i>
            class="fas fa-solid fa-xmark" onclick="clearList()">
        </span>
        <div class="input-container">
            <input type="text" id="myInput" placeholder="Das fehlt noch...">
            <button id="add" class="add">Ok</button>
        </div>
        <ul id="myUL"></ul>
    `;

    // document.getElementById("add").addEventListener("click", addElement);

    list.items.forEach(item => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function () {
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
        trashIcon.className = "fas fa-solid fa-trash fa-xs";
        trashIcon.style.color = "#008b8b";
        trashIcon.style.cursor = "pointer";
        trashIcon.addEventListener("click", function () {
            ul.removeChild(li);
            list.items = list.items.filter(i => i !== item);
        });
        li.appendChild(trashIcon);

        ul.appendChild(li);
    });
}


// change center title
function updateTitle(element) {
    lists[currentListIndex].title = element.textContent;
}

// reset center list
function clearList() {

    ul.innerHTML = ""; // Leere die Liste

    let titleElement = document.querySelector('.center h2');
    titleElement.textContent = "Reise nach XY"; // Setze die Überschrift zurück

    lists[currentListIndex].items = []; // Leere auch die Liste im Speicher
}



// function resetCenterColumn() {
//     let centerColumn = document.querySelector('.center');
//     centerColumn.innerHTML = `
//         <span>
//             <h2 contenteditable="true" onblur="updateTitle(this)">Reise nach XY</h2> 
//             <i class="fas fa-solid fa-print" onclick="showPrintOptions()"></i>
//             <i class="fas fa-solid fa-xmark" onclick="clearList()"></i>
//         </span>
//         <div class="input-container">
//             <input type="text" id="myInput" placeholder="Das fehlt noch...">
//             <button id="add" class="add">Ok</button>
//         </div>
//         <ul id="myUL"></ul>
//     `;
//     // document.getElementById("add").addEventListener("click", addElement);
// }

function resetRightColumn() {
    let rightColumn = document.querySelector('.right');
    let rightColumnList = document.getElementById('rList');
    rightColumn.style.display = "block";
    rightColumnList.remove();
}



// placeholder print window (nonfunctional)
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


// open browser print window and print center list
function PrintElem(elemId) {
    var ul = document.getElementById(elemId);
    var parentDiv = ul.closest('.center ');
    let span = parentDiv.querySelector('span');

    let title = span.firstElementChild.innerHTML;

    let titleH = title[0];
    console.log(span);

    console.log(title);
    var printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('@media print { body * { visibility: hidden; }');
    printWindow.document.write('#' + elemId + ', h2' + ', #' + elemId + ' * { visibility: visible; }');
    printWindow.document.write('#' + elemId + ', h2' + ' {font-family:Arial,Helvetica, sans-serif ; relative;text-align: left; list-style-type: none; width: 100%; font-size: large;} }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h2>');

    printWindow.document.write(title);
    printWindow.document.write('</h2>');

    printWindow.document.write(ul.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}





function SaveElem(elemId) {
    var ul = document.getElementById(elemId);
    var listItems = ul.querySelectorAll('li');
    var listData = [];

    listItems.forEach(function(item) {
        // Remove the checkbox input and trash icon from the text content
        var input = item.querySelector('input[type="checkbox"]');
        var trashIcon = item.querySelector('i');
        
        // Temporarily hide input and icon to get only the text content
        if (input) input.style.display = 'none';
        if (trashIcon) trashIcon.style.display = 'none';

        var text = item.textContent.trim();

        // Restore the display of input and icon
        if (input) input.style.display = '';
        if (trashIcon) trashIcon.style.display = '';

        listData.push({ text: text });
    });

    var jsonString = JSON.stringify(listData);
    localStorage.setItem("listData", jsonString);

    alert("Data saved: " + jsonString);
}
