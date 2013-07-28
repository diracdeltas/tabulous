var tabs = require("sdk/tabs");
var widgets = require("sdk/widget");
var ss = require("sdk/simple-storage");
var data = require("sdk/self").data;
var panels = require("sdk/panel");

ss.storage.myTabs = [];
ss.storage.oneTab = false; // initially ss.storage.oneTab is off 

function Tab(title, url, index, favicon) {
  this.url = url;
  this.index = index;
  this.favicon = favicon;
  this.title = title;
};

function addToMyTabs(element) {
  var tab_element = new Tab(element.title,
		  element.url,
		  element.index,
		  element.favicon)
  ss.storage.myTabs.push(tab_element);
  element.close();
}

function getInactiveTabs() {
  var activeTab = tabs.activeTab;
  var inactiveTabs = [];
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i] !== activeTab) {
      inactiveTabs.push(tabs[i]);
    }
  }
  return inactiveTabs;
}

function showTab(element) {
  tabs.open({
    url: element.url,
    inBackground: true,
  });
}

function toggle() {
  var inactiveTabs;
  if (!ss.storage.oneTab) {
    inactiveTabs = getInactiveTabs();
    while (tabs.length > 1) {
      console.log(ss.storage.myTabs);
      console.log(inactiveTabs);
      addToMyTabs(inactiveTabs.pop());
    }
    ss.storage.oneTab = true;
    widget.contentURL = data.url("tabulous_on.ico");
  } else {
    while (ss.storage.myTabs.length > 0) {
      console.log(ss.storage.myTabs);
      showTab(ss.storage.myTabs.pop());
    }
    ss.storage.oneTab = false;
    widget.contentURL = data.url("tabulous.ico");
  }
}

var widget = widgets.Widget({
  id: "tabulous",
  label: "Tabulous",
  contentURL: data.url("tabulous.ico"),
  onClick: toggle,
  tooltip: "Click to toggle one-tab mode"
});

var urlPanel = panels.Panel({
  width: 300,
  height: 500,
  contentURL: data.url("panel.html")
});

urlPanel.on("show", function () {
  urlPanel.port.emit("show",  ss.storage.myTabs);
})

