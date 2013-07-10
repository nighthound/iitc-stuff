// ==UserScript==
// @id             iitc-plugin-timestamp-with-seconds@nighthound
// @name           IITC plugin: timestamp with seconds
// @category       Highlighter
// @version        0.1.0
// @namespace      https://github.com/nighthound/iitc-stuff
// @updateURL      https://github.com/nighthound/iitc-stuff/raw/master/timestamp-with-seconds.meta.js
// @downloadURL    https://github.com/nighthound/iitc-stuff/raw/master/timestamp-with-seconds.user.js
// @description    Display log timestamps with seconds
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
window.plugin.timestampWithSeconds = function() {};

window.plugin.timestampWithSeconds.setup = function() {
    window.unixTimeToHHmm = function(time) {
      if(!time) return null;
      var d = new Date(typeof time === 'string' ? parseInt(time) : time);
      var h = '' + d.getHours(); h = h.length === 1 ? '0' + h : h;
      var m = '' + d.getMinutes(); m = m.length === 1 ? '0' + m : m;
      var s = '' + d.getSeconds(); s = s.length === 1 ? '0' + s : s;
      return  h + ':' + m + ':' + s;
    }
    
    $('head').append('<style>' +
  	'#chat td:first-child, #chatinput td:first-child {' +
		'  width: 64px;' +
		'  overflow: hidden;' +
		'  padding-left: 2px;' +
		'  color: #bbb;' +
		'  white-space: nowrap;' +
        '}' +
        '</style>');
}

var setup = window.plugin.timestampWithSeconds.setup;

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
