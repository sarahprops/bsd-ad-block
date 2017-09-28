// first test to see if this worked!
// alert("Hello from your Chrome extension!");
// following tutorial from https://robots.thoughtbot.com/how-to-make-a-chrome-extension
// var firstHref = $("a[href^='http']").eq(0).attr("href");
// console.log("Sarah's chrome extension is telling you that the first URL on this page is: " + firstHref);
// OK LETS TRY SOME SHIT

// global variables
var adSizesArray = ['250', '200', '468', '728', '300', '336', '120', '160', '300', '970'],
  replaceAdWidth,
  closestAdSize;

// function that finds the closest ad sizing based on whatever the first ad item blocked is
function closest(num) {

  var curr = adSizesArray[0],
      diff = Math.abs(num - curr);

  for (var val = 0; val < adSizesArray.length; val++) {
    var newdiff = Math.abs(num - adSizesArray[val]);
    if (newdiff < diff) {
      diff = newdiff;
      curr = adSizesArray[val];
    }
  }

  return curr;
}

// do all this stuff only when the page finishes loading
$(document).ready(function() {

  var ads = $('.ad'),
    counter = 0;

  ads.each(function() {

    // on the first iteration of the each
    if (counter === 0) {
      // mark the ad space
      $(this).addClass('replaceThisItem');
      // get the width of it
      replaceAdWidth = $(this).width();
      // find the closet ad space
      closestAdSize = closest(replaceAdWidth);
      //$(this).css("border", "100px solid pink");
      console.log(replaceAdWidth);
      console.log(closestAdSize);
    }

    // hide everything
    $(this).hide();
    // iterate to keep count
    counter++;

    console.log(counter);

  });

  // empty out our target space and SHOW IT
  $('.replaceThisItem').empty().show();

});
