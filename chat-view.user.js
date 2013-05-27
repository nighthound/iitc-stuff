// ==UserScript==
// @id             iitc-plugin-chat-view@nighthound
// @name           IITC plugin: Chat view on Intel
// @version        0.1.1
// @namespace      https://github.com/nighthound/iitc-stuff
// @updateURL      https://github.com/nighthound/iitc-stuff/raw/master/chat-view.meta.js
// @downloadURL    https://github.com/nighthound/iitc-stuff/raw/master/chat-view.user.js
// @description    Toggle to only show chat box
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper() {

// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function')
  window.plugin = function() {};

// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.chatView = function() {};

window.plugin.chatView.chatExpanded = function() {
  return $('#chat, #chatcontrols').hasClass('expand');
};

window.plugin.chatView.toggle = function() {
  var b = $('body');
  var t = $('#chatviewcontrols .toggle');
  if(b.hasClass('chatview_active')) {
    b.removeClass('chatview_active').addClass('chatview_inactive');
    t.text('Chat view inactive');
  } else {
    b.removeClass('chatview_inactive').addClass('chatview_active');
    t.text('Chat view active');
    if(!window.plugin.chatView.chatExpanded()) {
      window.plugin.chatView.wrapChatToggle();
    }
  }
};

window.plugin.chatView.wrapChatToggle = function() {
  window.chat.toggle();
  var c = $('#chat, #chatcontrols');
  if(c.hasClass('expand')) {
    $('#chatviewcontrols').removeClass('shrinked').addClass('expanded');
  } else {
    $('#chatviewcontrols').removeClass('expanded').addClass('shrinked');
  }
};

window.plugin.chatView.setup = function() {
  var chatview_button_width = 135;
  $('head').append('<style>' +
    '.chatview_active #map,' +
    '.chatview_active #sidebartoggle,' +
    '.chatview_active #scrollwrapper { display: none; }' +
    '.chatview_active #chat { width: auto; }' +
    '.chatview_active #chatinput { width: auto; }' +
    '.chatview_active #updatestatus {' +
    '  background-color: rgba(8, 48, 78, 0.9);' +
    '  border-top: 0;' +
    '  border-bottom: 1px solid #20A8B1;' +
    '  border-left: 1px solid #20A8B1;' +
    '  border-right: 1px solid #20A8B1;' +
    '  top: 0;' +
    '  color: #ffce00;' +
    '  font-size:13px;' +
    '  padding: 4px;' +
    '  position: fixed;' +
    '  right: 30px;' +
    '  bottom: auto;' +
    '  z-index:3002;' +
    '  -webkit-box-sizing: border-box;' +
    '  -moz-box-sizing: border-box;' +
    '  box-sizing: border-box;' +
    '}' +
    '#chatviewcontrols {' +
    '  color: #FFCE00;' +
    '  background: rgba(8, 48, 78, 0.9);' +
    '  position: absolute;' +
    '  left: 0;' +
    '  z-index: 3001;' +
    '  height: 26px;' +
    '  padding-left:1px;' +
    '  bottom: 82px;' +
    '}' +
    '#chatviewcontrols a {' +
    '  margin-left: -1px;' +
    '  display: inline-block;' +
    '  width: ' + chatview_button_width + 'px;' +
    '  text-align: center;' +
    '  height: 24px;' +
    '  line-height: 24px;' +
    '  border: 1px solid #20A8B1;' +
    '  vertical-align: top;' +
    '}' +
    '#chatviewcontrols a {' +
    '  text-decoration: none !important;' +
    '}' +
    '#chatviewcontrols .toggle {' +
    '  border-left: 10px solid transparent;' +
    '  border-right: 10px solid transparent;' +
    '  width: auto;' +
    '}' +
    '#chatcontrols {' +
    '  left: ' + (chatview_button_width + 1) + 'px;' +
    '}' +
    '#chatviewcontrols.expanded { top: 0; bottom: auto; }' +
    '#chatviewcontrols.shrinked { bottom: 82px; }' +
    // '.chatview_active #chatviewcontrols { bottom: 0; }' +
    
    '</style>');

  $('body').addClass('chatview_active');

  //Wrap iitc chat toggle to update our elements
  $('#chatcontrols a:first').unbind('click');
  $('#chatcontrols a:first').click(window.plugin.chatView.wrapChatToggle);

  $('#chatcontrols').before('<div id="chatviewcontrols" class="shrinked">' +
    '  <a><span class="toggle"></span></a>' +
    '</div>');
  $('#chatviewcontrols a').click(window.plugin.chatView.toggle);

  window.plugin.chatView.toggle();
};

var setup = window.plugin.chatView.setup;

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
