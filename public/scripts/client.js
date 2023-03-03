//  * Client-side JS logic

//runs when the dom is loaded
$(document).ready(function () {
  //event listener for submit and call createTweetWithAJAX
  $("form").on("submit", createTweetWithAJAX);

  //event listener for click on nav bar button
  $(".arrows").on("click", function () {
    $("#tweet-text").focus();
  });

  //first function call after the dom loads
  loadTweets();
});
