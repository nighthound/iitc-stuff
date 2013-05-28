// ==UserScript==
// @id             iitc-plugin-toggle-resonators-display@nighthound
// @name           IITC plugin: Toggle resonators display
// @version        0.1
// @namespace      https://github.com/nighthound/iitc-stuff
// @updateURL      https://github.com/nighthound/iitc-stuff/raw/master/toggle-resonators-display.meta.js
// @downloadURL    https://github.com/nighthound/iitc-stuff/raw/master/toggle-resonators-display.user.js
// @description    Adds a button toggle to show/hide resonators
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////


// use own namespace for plugin
window.plugin.toggleResonatorsDisplay = function() {};

// make backup of original function
window.plugin.toggleResonatorsDisplay.isResonatorsShow = window.isResonatorsShow;

window.plugin.toggleResonatorsDisplay.show = function() {
  $('#toggle-resonators-button').removeClass('hide');
  $('#toggle-resonators-button').off('click');
  $('#toggle-resonators-button').click(window.plugin.toggleResonatorsDisplay.hide);

  window.isResonatorsShow = window.plugin.toggleResonatorsDisplay.isResonatorsShow;
    
  // refresh only if current zoom shows resonators
  if (window.plugin.toggleResonatorsDisplay.isResonatorsShow())
    window.startRefreshTimeout(1000);
}

window.plugin.toggleResonatorsDisplay.hide = function() {
  $('#toggle-resonators-button').addClass('hide');
  $('#toggle-resonators-button').off('click');
  $('#toggle-resonators-button').click(window.plugin.toggleResonatorsDisplay.show);

  // save previous display zoom
  window.isResonatorsShow = function() { return false; }
  
  // refresh only if current zoom shows resonators
  if (window.plugin.toggleResonatorsDisplay.isResonatorsShow()) {  
    // trigger removal of all resonators
    map.zoomIn();
    map.zoomOut();
  }
};

window.plugin.toggleResonatorsDisplay.setup = function() {
  $('head').append('<style>' +
    '#toggle-resonators-button { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhGMUQ2RTI1Qzc1QTExRTJBM0YxOURBREU4NzU5MjQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhGMUQ2RTI2Qzc1QTExRTJBM0YxOURBREU4NzU5MjQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEYxRDZFMjNDNzVBMTFFMkEzRjE5REFERTg3NTkyNDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEYxRDZFMjRDNzVBMTFFMkEzRjE5REFERTg3NTkyNDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4KLvPoAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAABZSURBVHjavJNBDgAQEAPH/z/tQOgSNCEcRHZW09QibRcfMewwDNzFpa67Yr0nZxMHz7O44xxGTrDdee1CNAW3LgMfxE/W3MxXsTzJfPWgl9PijOLfX5IFGABZ3QLxc/3iXwAAAABJRU5ErkJggg==); }' +
    '#toggle-resonators-button.hide { background-color: #000; }' +
    '</style>');

  var toggle = $('<div class="toggle-resonators-control leaflet-bar leaflet-control"><a id="toggle-resonators-button" class="hide" title="Toggle resonators display" href="#"></a></div>');
  $('.leaflet-control-container > .leaflet-top.leaflet-left').append(toggle);
  window.plugin.toggleResonatorsDisplay.show();
}

var setup =  window.plugin.toggleResonatorsDisplay.setup;

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
