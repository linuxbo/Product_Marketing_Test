/*
developed by Flare instructor/consultant Scott DeLoach, ClickStart - www.clickstart.net
based on James Padolsey's find/replace highligher code - james.padolsey.com
*/

var anyCase = true;
var wholeWords = true;
function findAndReplace(searchText, replacement, searchNode) {
  if (!searchText || typeof replacement === 'undefined') return;
  var ig = '';
  if (anyCase) ig = 'i'; 
  var regex = typeof searchText === 'string' ?
              new RegExp(searchText, ig+'g') : searchText,
              childNodes = (searchNode || document.body).childNodes,
              cnLength = childNodes.length,
              excludes = 'html,head,style,title,link,meta,script,object,iframe';
  while (cnLength--) {
    var currentNode = childNodes[cnLength];
    if (currentNode.nodeType === 1 &&
       (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
      arguments.callee(searchText, replacement, currentNode);
    }
    if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
      continue;
    }
    var parent = currentNode.parentNode,
                 frag = (function() {
                        var html = currentNode.data.replace(regex, replacement),
                                   wrap = document.createElement('div'),
                                   frag = document.createDocumentFragment();
                                   wrap.innerHTML = html;
                        while (wrap.firstChild) {
                          frag.appendChild(wrap.firstChild);
                        }
                        return frag;
                  })();
    parent.insertBefore(frag, currentNode);
    parent.removeChild(currentNode);
  }
}

function doSearch() {
if (window.parent.document.getElementById('search-field')) {
  qsParm = window.parent.document.getElementById('search-field').value;
  if (qsParm == '') {
    return false;
  }
  qsParm = qsParm.replace(",","|");
  qsParm = qsParm.replace(/['"]/g,'');
  if (wholeWords) {
    qsParm = '\\b'+qsParm+'\\b';
    qsParm = qsParm.replace("|","\\b|\\b");
  }
  findAndReplace(qsParm, function(term){ return '<span class="hi">' + term + '</span>'});
  return false;
} }

function removeSearch() {
window.parent.document.getElementById('search-field').value = "";
$("span").toggleClass("hi",false);
}
