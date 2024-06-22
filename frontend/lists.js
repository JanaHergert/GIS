
//  alert("Check");
    var cList= document.getElementById("centerLists");
    var list = document.createElement("ul");
    
    // Retrieve the JSON string from localStorage
    var jsonString = localStorage.getItem('listData');

if (jsonString) {
    // Parse the JSON string into an array of objects
    var listData = JSON.parse(jsonString);

    // Iterate over the array and create list items for each object element
    listData.forEach(function(item) {
        var li = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            li.style.textDecoration = "line-through";
        } else {
            li.style.textDecoration = "none";
        }
    });
    
        cList.appendChild(li);
        li.appendChild(checkbox);
        // li.value = checkbox;
        // li.textContent = item.text;
        // list item text
    let text = document.createTextNode(item.text);
    li.appendChild(text);
    li.style.listStyle= "none";
    });
}

