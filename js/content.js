// first test to see if this worked!
// alert("Hello from your Chrome extension!");
// following tutorial from https://robots.thoughtbot.com/how-to-make-a-chrome-extension
// var firstHref = $("a[href^='http']").eq(0).attr("href");
// console.log("Sarah's chrome extension is telling you that the first URL on this page is: " + firstHref);
// OK LETS TRY SOME SHIT
$(document).ready(function() {

  var ads = $('.ad'),
      counter = 0;

  ads.hide();

  ads.each(function() {
    counter++;
    console.log(counter);
  });

});
