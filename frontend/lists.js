
//  alert("Check");
    var cList= document.getElementById("centerLists");
    var rList= document.getElementById("rightLists");

    
    // Retrieve the JSON string from localStorage
    var jsonString = localStorage.getItem('listData');
    var jsonString2 = localStorage.getItem('listDataR');

if (jsonString) {
    var list = document.createElement("ul");

    var a = 1;
  var incr = ++a;
    
    list.id= "cUl"+incr;
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
    
        cList.appendChild(list);
        list.appendChild(li);

        li.appendChild(checkbox);
        // li.value = checkbox;
        // li.textContent = item.text;
        // list item text
    let text = document.createTextNode(item.text);
    li.appendChild(text);
    li.style.listStyle= "none";
    });
}

if (jsonString2) {
     var list = document.createElement("ul");
    var a = 1;
    var incr = ++a;
      
      list.id= "rUl"+incr;
    // Parse the JSON string into an array of objects
    var listDataR = JSON.parse(jsonString2);

    // Iterate over the array and create list items for each object element

    listDataR.forEach(function(item) {
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
    
        rList.appendChild(list);
        list.appendChild(li);
        li.appendChild(checkbox);
        // li.value = checkbox;
        // li.textContent = item.text;
        // list item text
    let text = document.createTextNode(item.text);
    li.appendChild(text);
    li.style.listStyle= "none";
    });
}
