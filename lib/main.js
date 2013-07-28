var tabs = require("sdk/tabs");
var widgets = require("sdk/widget");
var ss = require("sdk/simple-storage");
var data = require("sdk/self").data;

ss.storage.myTabs = [];
ss.storage.oneTab = 0; // initially ss.storage.oneTab is off 

function addToMyTabs(element) {
  ss.storage.myTabs.push(element.url);
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
    url: element,
    inBackground: true,
  });
}

function toggle() {
  var inactiveTabs;
  if (ss.storage.oneTab === 0) {
    inactiveTabs = getInactiveTabs();
    while (tabs.length > 1) {
      addToMyTabs(inactiveTabs.pop());
    }
    ss.storage.oneTab = 1;
  } else {
    while (ss.storage.myTabs.length > 0) {
      showTab(ss.storage.myTabs.pop());
    }
    ss.storage.oneTab = 0;
  }
}

var widgets = widgets.Widget({
  id: "tabulous",
  label: "Tabulous",
  contentURL: data.url("tabulous.ico"),
  onClick: toggle
});

