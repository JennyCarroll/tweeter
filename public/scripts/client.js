/*
 * Client-side JS logic
 */

//a function to escape some text
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//a function that takes in an array of tweet objects and prepends the new tweet element in the tweets section of index.html
const renderTweets = function (arrOfTweetObjs) {
  for (const obj of arrOfTweetObjs) {
    //leverage createTweetElement function by passing in the tweet object
    const tweet = createTweetElement(obj);
    //use returned jQuery obj by appending each one to the .tweets section
    $(".tweets").prepend(tweet);
  }
};

//a function for fetching a list of tweets from the database (backend)
const loadTweets = function () {
  //use jQuery to make a request to /tweets and receive an array of tweets as JSON
  $.ajax({
    url: "/tweets",
    type: "application/json",
    method: "get",
    //success will run when we get back a succesful http response (200)
    success: (data) => {
      renderTweets(data);
    },
  });
};

/* this handler function submits form input data and displays a new tweet using jQuery
 ** so that the page doesn't need to refresh*/
const createTweetWithAJAX = function (event) {
  // prevent default behaviour of submit event (data submission and page refresh)
  event.preventDefault();
  // disallow form submission if tweet area is empty or exceeds 140 character limit
  const textAreaContent = $("#tweet-text").val();
  $(".error").slideUp(400, () => {
    if (textAreaContent === "") {
      $(".error").html("Tweet not present!  Please write tweet.").slideDown();
      return;
    }
    if (textAreaContent.length > 140) {
      $(".error").html("Content too long! Be more concise.").slideDown();
      return;
    }
  });
  //wrap jquery around the form to call .serialize on it, turning a set of form data into a query string
  const data = $(event.target).serialize();
  // create AJAX POST request that sends to the server the encoded data string
  $.ajax({
    url: "/tweets",
    data: data,
    type: "application/json", //telling ajax what to turn the encoded string into
    method: "post",
    success: (data) => {
      //will run when we get back a succesful http response (200) meaning the data succesfully got to the server
      //extra stuff that could happen after we get a succesful response from the server
      //clear the textarea by assigning its value to an empty string
      $("textarea").val("");
      //new get request to get the last item and pass it to renderTweets which will prepend it to the tweets
      // $.ajax("/tweets", { method: "GET" }).then((arrOfTweets) => {
      //   renderTweets(arrOfTweets.slice(-1));
      // });
      loadTweets();
    },
  });
};

//takes in tweet object and returns $tweet container holding jQuery string html article element populated with object data
const createTweetElement = function (tweetObj) {
  const $tweet = $(`<article class="tweet">
  <header class="tweets-header">
    <span class="id"> 
      <img src=${tweetObj.user.avatars}>
      ${tweetObj.user.name}
    </span>
    <span class="handle">${tweetObj.user.handle}</span>
  </header>
  ${escape(tweetObj.content.text)}
  <footer>
    ${timeago.format(tweetObj.created_at)}
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-sharp fa-solid fa-heart"></i>
  </footer>
</article><br>`);
  return $tweet;
};

//runs whem the dom is loaded
$(document).ready(function () {
  // add event listener for submit and call createTweetWithAJAX
  $("form").on("submit", createTweetWithAJAX);

  //first function call after the dom loads
  loadTweets();
});
