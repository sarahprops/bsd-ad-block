// first test to see if this worked!
// alert("Hello from your Chrome extension!");
// following tutorial from https://robots.thoughtbot.com/how-to-make-a-chrome-extension
// var firstHref = $("a[href^='http']").eq(0).attr("href");
// console.log("Sarah's chrome extension is telling you that the first URL on this page is: " + firstHref);
// OK LETS TRY SOME SHIT

// global variables
var newAdWidth = null,
  newAdHeight = null,
  closestAdSize = null,
  finalCount = null,
  sizes = null;

// function that finds the closest ad sizing based on whatever the first ad item blocked is
function closest(num, sizeArr) {

  var curr = sizeArr[0].w,
    diff = Math.abs(num - curr);

  for (var i = 0; i < sizeArr.length; i++) {
    var newdiff = Math.abs(num - sizeArr[i].w);
    if (newdiff < diff) {
      diff = newdiff;
      curr = sizeArr[i].w;
    }
  }

  return curr;
}

function getJSONData(url) {
  var data = null;

  $.ajax({
    'async': false,
    url: url,
    dataType: 'json',
    success: function(response) { // callback for successful completion
      data = response;
    },
    error: function() { // callback if there's an error
      // do something
    }
  });

  return data;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// LETS CREATE US A NEW ADD
function createNewAd(client, sizeArr) {
  var index = sizeArr.map(function(ad) { return ad.w; }).indexOf(newAdWidth),
    finalAsk;
  newAdHeight = sizeArr[index].h;
  //console.log(newAdWidth + ', ' + newAdHeight);

  // Ask limits - if there are more than 25 ads, only ask for $25
  if (finalCount > 25) {
    finalAsk = 25;
  } else {
    finalAsk = finalCount;
  }

  var newAd = '<a id="blue-state-ask" target="_blank" href="' + client.url + '"' + 'style="width:' + newAdWidth + 'px; min-height:' + newAdHeight + 'px;">' + 'We blocked ' + finalCount + ' ads on this page. Consider donating $' + finalAsk + ' to ' + client.title + '</a>';

  $('.replaceThisItem').append(newAd).show();
}

// do all this stuff only when the page finishes loading
$(document).ready(function() {
  var ads = $('.ad, [class*=dfp], [data-google-query-id], [id*=adzerk]'),
    counter = 0;

  sizes = getJSONData(chrome.extension.getURL('data/clients.json'));

  ads.each(function() {

    // on the first iteration of the each
    if (counter === 0) {
      // mark the ad space
      $(this).addClass('replaceThisItem').empty();
      // get the width of it
      replaceAdWidth = $(this).width();
      // find the closet ad space
      newAdWidth = closest(replaceAdWidth, sizes);
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
  var clients = getJSONData(chrome.extension.getURL('data/clients.json')),
  clientsRandomized = shuffle(clients);

  createNewAd(clientsRandomized[0], sizes);
});
