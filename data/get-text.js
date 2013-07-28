addon.port.on("show", function(myTabs) {
  var items = document.getElementById("items");
  items.innerHTML = '';
  for (var i = 0; i < myTabs.length; i++) {
    var p = items.appendChild(document.createElement("p"));
    p.id = 'check'+String(i);
    var li = p.appendChild(document.createElement("input"));
    li.type = "checkbox";
    li.checked = true;
    li.name = 'check'+String(i);
    var url = p.appendChild(document.createElement("a"));
    url.href = myTabs[i].url;
    var title = url.appendChild(document.createTextNode(myTabs[i].title));
    items.appendChild(li);
    li.onchange = function() {
	    items.removeChild(document.getElementById(li.name));
	    items.removeChild(li);
    };
  }
})
