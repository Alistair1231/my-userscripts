// ==UserScript==
// @name         Fitgirl repacks bigger images/center-alignment and 1080p optimization
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.6
// @description  bigger images/center-alignment and 1080p optimization
// @author       Alistair1231
// @match        https://fitgirl-repacks.site/*
// @icon         https://icons.duckduckgo.com/ip2/fitgirl-repacks.site.ico
// @grant        none
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @downloadURL https://github.com/Auncaughbove17/my-userscripts/raw/main/fitgirlWide.user.js
// @license GPL-3.0
// ==/UserScript==

// https://draeton.github.io/javascript/library/2011/09/11/check-if-image-exists-javascript.html
{
  var checkImageErrors = {};
  function checkImage(url, success, failure) {
    var img = new Image(),    // the
      loaded = false,
      errored = false;
    img.onload = function () {
      if (loaded)
        return;
      loaded = true;
      if (success && success.call)
        success.call(img);
    };
    img.onerror = function () {
      if (errored) {
        return;
      }
      checkImageErrors[url] = errored = true;
      if (failure && failure.call) {
        failure.call(img);
      }
    };
    if (checkImageErrors[url]) {
      img.onerror.call(img);
      return;
    }

    img.src = url;
    if (img.complete) {
      img.onload.call(img);
    }
  }
}
////////////////

/////////////////////
// my code
/////////////////////
function makeImgBig() {
  // make more space on the site
  jQuery(".site").css("max-width", "1920px");
  jQuery(".entry-content").css("max-width", "1920px");
  jQuery("#masthead").css("max-width", "1920px"); // search bar

  // image align center
  jQuery(
    "article .entry-content p:first-of-type img:first-of-type"
  ).removeClass();
  // align torrentInfo stats images
  jQuery(".entry-content ul li img:not(.wplp-lazy)").addClass("aligncenter");

  //text align center
  jQuery("article").css("text-align", "center");
  // display to contents text is under image and not blocked by anything
  jQuery("article .entry-content p:first-of-type").css("display", "contents");


  document
    .querySelectorAll("article .entry-content h3:not(:first-of-type)+p img") //screenshots
    .forEach((element) => {
      if (element.flag != 1) {
        // preview images
        element.width *= 2.5;
        element.height *= 2.5;

        var imageUrl = element.src.replace(/(.*)\.240p\.jpg$/, "$1");
        var imageUrlAlt = element.src.replace(/(.*)\.240p\.jpg$/, "$1.1080p.jpg");

        checkImage(imageUrl, () => { element.src = imageUrl; }, () => { element.src = imageUrlAlt; });

        element.flag = 1;
      }

      document
        .querySelectorAll("article .entry-content p:first-of-type img") //cover images
        .forEach((element) => {
          if (element.flag != 1) {
            // cover images
            element.width *= 2.5;
            element.height *= 2.5;
          }
          element.flag = 1;
        });
    });
}

function makeArticleTwoColumns(myArticle) {
  // for testing
  // var myArticle =   jQuery("article .entry-content:not(:contains('Upcoming repacks'))").first();
  
  //  get data from article
  var origContent = jQuery("p",myArticle).first();
  var columnContent = jQuery("p",myArticle).first().get(0).childNodes;
  var downloadHeaderString = jQuery("h3",myArticle)[1].outerHTML;
  var downloadLinksString = jQuery(jQuery("h3",myArticle)[1]).next().get(0).outerHTML;
  var downloadHeader = jQuery(jQuery("h3",myArticle)[1]);
  var downloadLinks = jQuery(jQuery(jQuery("h3",myArticle)[1]).next().get(0));

  // create table to  put data in
  var myTable = document.createElement('table');
  myTable.style="border:none;font-size: inherit;";
  
  // populate table with data
  
  // column 1 is image and first <br>
  var column1 = `<td style="border:none; text-align: right; width:50%">${columnContent[0].outerHTML}${columnContent[1].outerHTML}</td>`;
  // column 2 is all other entries in article
  var column2= `<td style="border:none; vertical-align: middle; text-align:left;">`;
  for(var i=2;i<columnContent.length;i++){ // i=2 to skip content from column 1 
    if(columnContent[i].outerHTML == undefined)
      column2+=`${columnContent[i].data}`;
    else
      column2+=`${columnContent[i].outerHTML}`;
  }
  column2+=downloadHeaderString;
  column2+=downloadLinksString;
  column2+=`</td>`;
  myTable.innerHTML=`<tr>${column1}${column2}</tr>`;
  
  // insert table into site and hide old content
  jQuery(origContent).before(myTable);
  origContent.hide();
  downloadHeader.hide();
  downloadLinks.hide();

}


(function () {
  "use strict";

  jQuery.noConflict();

  makeImgBig();

  jQuery("article .entry-content:not(:contains('Upcoming repacks'))").each(function () {
    makeArticleTwoColumns(jQuery(this));
  });

  // make all torrent info pics not centered
  jQuery("table ul li img[src^='https://torrent-stats']").removeClass()

})();
