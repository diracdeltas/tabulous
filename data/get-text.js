addon.port.on("show", function(myTabs) {
  var items = document.getElementById("items");
  for (var i = 0; i < myTabs.length; i++) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(String(myTabs[i].url)));
    items.appendChild(li);
  }
})
