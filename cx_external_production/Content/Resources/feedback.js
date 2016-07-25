                  /******************************************************************************
                 * These functions create a scrollable region on the page for the topic.
                 *
                 * Author: Dustin Pease. (Dustin rocks. Thanks Dustin.)
                 *
                 *****************************************************************************/

                /******************************************************************************
                 * Generic Utility class. All methods are class level and can be accessed via Utils.methodname();
                 * @constructor
                 *
                 *****************************************************************************/
                function Utils() {
                                //empty
                }

                /******************************************************************************
                 * Utility function that attaches an event to an element - cross browser<br />
                 * Example: <code>Utils.addEvent()</code><br />
                 * @param {Object} obj Object to add an event to<br />
                 * @param {Event} evt Event you would like to add<br />
                 * @param {Function} fn<br />
                 * @param {Boolean} useCapture<br />
                 * @return Boolean
                 * 
                 *****************************************************************************/
                Utils.addEvent = function(obj, evt, fn, useCapture)
                {
                                if (obj.addEventListener)
                                {
                                                obj.addEventListener(evt, fn, Boolean( useCapture ));
                                                return true;
                                }
                                else if (obj.attachEvent)
                                {
                                                var r = obj.attachEvent("on"+evt, fn);
                                                return r;
                                }
                                else
                                {
                                                return false;
                                }
                }


                
                function PageSizer()
                {
                                this.pageWidth = 0;
                                this.pageHeight = 0;
                                this.windowWidth = 0;
                                this.windowHeight = 0;
                }
                
                
                PageSizer.prototype.refresh = function ()
                {

                                var xScroll, yScroll,pageHeight,pageWidth;

                                var obj = new Object();

                                if (window.innerHeight && window.scrollMaxY) {
                                                xScroll = document.body.scrollWidth;
                                                yScroll = window.innerHeight + window.scrollMaxY;
                                } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
                                                xScroll = document.body.scrollWidth;
                                                yScroll = document.body.scrollHeight;
                                } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
                                                xScroll = document.body.offsetWidth;
                                                yScroll = document.body.offsetHeight;
                                }
                                var windowWidth, windowHeight;
                                if (self.innerHeight) {      // all except Explorer
                                                windowWidth = self.innerWidth;
                                                windowHeight = self.innerHeight;
                                } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
                                                windowWidth = document.documentElement.clientWidth;
                                                windowHeight = document.documentElement.clientHeight;
                                } else if (document.body) { // other Explorers
                                                windowWidth = document.body.clientWidth;
                                                windowHeight = document.body.clientHeight;
                                }

                                // for small pages with total height less then height of the viewport
                                if(yScroll < windowHeight){
                                                pageHeight = windowHeight;
                                } else {
                                                pageHeight = yScroll;
                                }

                                // for small pages with total width less then width of the viewport
                                if(xScroll < windowWidth){
                                                pageWidth = windowWidth;
                                } else {
                                                pageWidth = xScroll;
                                }
                                if(this.doc==undefined)
                                {
                                                this.doc = new Object();
                                }
                                this.pageWidth = pageWidth;
                                this.pageHeight = pageHeight;
                                this.windowWidth = windowWidth;
                                this.windowHeight = windowHeight;
                }

                var pageSizer = new PageSizer();
                
                function initUI(){
        moveH1();
                                refreshUIHeight();
                }
                
function refreshUIHeightST(){
document.getElementById('header').scrollIntoView();
                window.setTimeout( refreshUIHeight, 1);

}
                function refreshUIHeight(){
                                
                                pageSizer.refresh();
                                if(document.all)
                                {
                                    var ieOffset=20;
                                   }
                                else{
            var ieOffset=0;
                                }
                                document.getElementById('body').style.height = (pageSizer.windowHeight-document.getElementById('body').offsetTop-55+ieOffset)+'px';
   //     document.getElementById('body').style.width = (pageSizer.windowWidth-21+ieOffset)+"px";

                }
                
function moveH1(){

    var h1s =  document.getElementsByTagName('h1');

    if (h1s.length>0){
        h1 = h1s[0];
        
        var newH1 = document.createElement("h1");
                        newH1.innerHTML = h1.innerHTML;
                        document.getElementById('header').appendChild(newH1);
    }          
}

Utils.addEvent(window,'resize',refreshUIHeight,false)

initUI();


Utils.addEvent(window,'load',refreshUIHeightST,false)


//--------------------------------------------------------------------------------
// Help Central Feedback javascript
// 
// Usage instructions:
// 
// Include on a help topic master template
// 
// Example Code:
// 
// <div id="feedbackLinks"></div>
// <script type="text\javascript" src="../feedback.js" >< /script>
//
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// The text that gets written out to the left of the Yes or No links.
//--------------------------------------------------------------------------------
var feedbackLinkText = "Was this topic helpful? ";

//--------------------------------------------------------------------------------
// The url that will be loaded into the iframe when the Yes button is clicked on.
//--------------------------------------------------------------------------------
var feedbackYesUrl = "http://nct.digitalriver.com/fulfill/0196.381";

//--------------------------------------------------------------------------------
// The url that will be loaded into the iframe when the No button is clicked on.
//--------------------------------------------------------------------------------
var feedbackNoUrl = "http://nct.digitalriver.com/fulfill/0196.380";

//--------------------------------------------------------------------------------
// This file depends on a DIV with an id equal to this value to writ text into
//--------------------------------------------------------------------------------
var feedbackLinksDivId = "feedbackLinks";

//--------------------------------------------------------------------------------
// Color of the border that will be above the links
//--------------------------------------------------------------------------------
var feedbackTopBorderColor = "#088CD6";


//********************************************************************************
// Do not change anything below this line.
//********************************************************************************

function showFeedbackForm(type)
{
                var iframeWrapper = document.getElementById(feedbackLinksDivId+"_iframeWrapper");
                var linksWrapper = document.getElementById(feedbackLinksDivId+"_inner");
                
                var url = "";
                var iframeHeight = "";
                if (type=="Yes")
                {
                                url = feedbackYesUrl;
                                iframeHeight = '450px';
                }
                if (type=="No")
                {
                                url = feedbackNoUrl;
                                iframeHeight = '480px';
                }
                
                // We find the current topic file name and append to the url
                url+="?helpTopic="+getCurrentHelpTopic();
                
                // We build up an iframe and append into the empty div we made when the page was initially run
                var iframe = document.createElement("iframe");
                                iframe.src = url;
                                iframe.style.border='0px';
                                iframe.style.width='100%';
                                iframe.style.height=iframeHeight;
                                iframe.frameBorder=0;
                                iframeWrapper.appendChild(iframe);
                
                var bdy = document.getElementById('body');
        bdy.style.width='';
                    bdy.style.height='';
                    bdy.style.overflow='auto';
                   
                     document.body.style.overflow='auto';
                    
                // We hide the links
                linksWrapper.style.display = "none";
                // Then we show the iframe to the user and scroll it into view
                iframeWrapper.style.display = "block";
                iframeWrapper.scrollIntoView();

}

function showFeedbackLinks()
{
                var feedbackLinksDiv = document.getElementById(feedbackLinksDivId);
                                var s = "";
                                                s+="<div id=\""+feedbackLinksDivId+"_inner\" style=\"display:block;margin-top:10px;margin-bottom:10px;border-top:0px solid "+feedbackTopBorderColor+";\">";
                                                s+=feedbackLinkText;
                                                s+="<input type=\"button\"  onclick=\"showFeedbackForm('Yes')\" value=\"Yes\" style=\"width:40px;\" />";
                                                s+=" or ";
                                                s+=" <input type=\"button\" onclick=\"showFeedbackForm('No')\" value=\"No\" style=\"width:40px;\" />";
                                                s+="</div>";
                                                s+="<div id=\""+feedbackLinksDivId+"_iframeWrapper\" style=\"display:hidden\" ></div>";
                var div = document.createElement("div");
                                div.innerHTML = s;
                                feedbackLinksDiv.appendChild(div);
}

function getCurrentHelpTopic()
{
                var v = window.location+"";
                
                var a = v.split("/");
                var n = "";
                
                if (a.length>0)
                {
                                n = a[a.length-1];
                }

                return n;
}

showFeedbackLinks();
