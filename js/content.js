// first test to see if this worked!
// alert("Hello from your Chrome extension!");
// following tutorial from https://robots.thoughtbot.com/how-to-make-a-chrome-extension
// var firstHref = $("a[href^='http']").eq(0).attr("href");
// console.log("Sarah's chrome extension is telling you that the first URL on this page is: " + firstHref);
// OK LETS TRY SOME SHIT

// global variables
var newAdWidth,
  newAdHeight,
  closestAdSize,
  finalCount;

var sizes = [{
    "w": 250,
    "h": 250
  },
  {
    "w": 200,
    "h": 200
  },
  {
    "w": 468,
    "h": 60
  },
  {
    "w": 728,
    "h": 90
  },
  {
    "w": 300,
    "h": 250
  },
  {
    "w": 336,
    "h": 280
  },
  {
    "w": 120,
    "h": 600
  },
  {
    "w": 160,
    "h": 600
  },
  {
    "w": 970,
    "h": 90
  }
];

// function that finds the closest ad sizing based on whatever the first ad item blocked is
function closest(num) {

  var curr = sizes[0].w,
    diff = Math.abs(num - curr);

  for (var i = 0; i < sizes.length; i++) {
    var newdiff = Math.abs(num - sizes[i].w);
    if (newdiff < diff) {
      diff = newdiff;
      curr = sizes[i].w;
    }
  }

  return curr;
}

// LETS CREATE US A NEW ADD
function createNewAd() {
  var index = sizes.map(function(ad) { return ad.w; }).indexOf(newAdWidth),
    finalAsk;
  newAdHeight = sizes[index].h;
  //console.log(newAdWidth + ', ' + newAdHeight);

  // Ask limits - if there are more than 25 ads, only ask for $25
  if (finalCount > 25) {
    finalAsk = 25;
  } else {
    finalAsk = finalCount;
  }

  var newAd = '<div id="blue-state-ask" style="width:' + newAdWidth + 'px;height:' + newAdHeight + 'px;"><h3>We blocked ' + finalCount + ' ads on this page. Consider donating $' + finalAsk + ' to COMPANY</h3></div>';

  $('.replaceThisItem').append(newAd).show();
}

// do all this stuff only when the page finishes loading
$(document).ready(function() {

  var ads = $('.ad, [class*=dfp], [data-google-query-id]'),
    counter = 0;

  ads.each(function() {

    // on the first iteration of the each
    if (counter === 0) {
      // mark the ad space
      $(this).addClass('replaceThisItem').empty();
      // get the width of it
      replaceAdWidth = $(this).width();
      // find the closet ad space
      newAdWidth = closest(replaceAdWidth);
    }

    // hide everything
    $(this).hide();
    // iterate to keep count
    counter++;

  });

  // globalize that var
  finalCount = counter;

});

// only create the new ad after the page finishes loading
$(window).load(function() {
  createNewAd();
});
