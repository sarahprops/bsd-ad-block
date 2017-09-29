// first test to see if this worked!
// alert("Hello from your Chrome extension!");
// following tutorial from https://robots.thoughtbot.com/how-to-make-a-chrome-extension
// var firstHref = $("a[href^='http']").eq(0).attr("href");
// console.log("Sarah's chrome extension is telling you that the first URL on this page is: " + firstHref);
// OK LETS TRY SOME SHIT

// global variables
var finalCount = null;

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
function createNewAd(client) {
  var finalAsk = null,
      adPronoun = 'ads';

  // Ask limits - if there are more than 25 ads, only ask for $25
  if (finalCount > 25) {
    finalAsk = 25;
  } else {
    finalAsk = finalCount;
    if(finalCount===1){
      adPronoun = 'ad';
    }
  }
  var newAd = '<div id="blue-state-ask"><a id="blue-state-ask__bar"' +
    'target="_blank" href="' + client.url + '?default_amt=' + finalAsk +
    '"><span>We blocked ' + finalCount + ' ' + adPronoun + ' on this page. ' +
    '<strong>Consider donating $' + finalAsk + ' to ' + client.title +
    '</strong>.</span></a><a id="blue-state-ask__expander"></a></div>';

  $('body').append(newAd).show();
}

// do all this stuff only when the page finishes loading
$(document).ready(function() {
  var ads = $('.ad, [class*=dfp], [id*=google_ad], [id^=ads], [class^=ad], [class*=promoted], [src*=ads], [class*=ads], iframe, [href*=adclick], [href*=doubleclick], [href*=paid], [href*=adform], [onmousedown*=ad]'),
    counter = 0;

  sizes = getJSONData(chrome.extension.getURL('data/clients.json'));

  ads.each(function() {
    // hide everything
    $(this).hide();
    // iterate to keep count
    counter++;
  });

  // globalize that var
  finalCount = counter;

  var clients = getJSONData(chrome.extension.getURL('data/clients.json')),
  clientsRandomized = shuffle(clients);

  if (finalCount > 0) {
    createNewAd(clientsRandomized[0]);

    setTimeout(function() {
      $('body').addClass('bsd-ad-loaded');
    }, 500);
  }

  $('#blue-state-ask__expander').on('click', function(e) {
    e.preventDefault();
    $('#blue-state-ask').toggleClass('bsd-is-hidden');
  });
});
