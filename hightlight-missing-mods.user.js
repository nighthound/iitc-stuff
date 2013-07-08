// ==UserScript==
// @id             iitc-plugin-highlight-missing-mods@nighthound
// @name           IITC plugin: hightlight missing mods
// @category       Highlighter
// @version        0.1.0
// @namespace      https://github.com/nighthound/iitc-stuff
// @updateURL      https://github.com/nighthound/iitc-stuff/raw/master/highlight-missing-mods.meta.js
// @downloadURL    https://github.com/nighthound/iitc-stuff/raw/master/highlight-missing-mods.user.js
// @description    Highlight portals with missing mods
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
window.plugin.highlightMissingMods = function() {};

window.plugin.highlightMissingMods.highlight = function(data) {
  var d = data.portal.options.details;
  
  var missing_mod = 0;
  $.each(d.portalV2.linkedModArray, function(ind, mod) {
    if(mod == null)
      missing_mod++;
  });
  
  if(missing_mod > 0) {
    var fill_opacity = missing_mod/4;
    var color = 'red';
    fill_opacity = Math.round(fill_opacity*100)/100;
    var params = {fillColor: color, fillOpacity: fill_opacity};
    data.portal.setStyle(params);
  }

  window.COLOR_SELECTED_PORTAL = '#f0f';
}

var setup =  function() {
  window.addPortalHighlighter('Missing mods', window.plugin.highlightMissingMods.highlight);  
}

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

