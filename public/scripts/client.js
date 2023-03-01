/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const createTweetElement = function (tweetObj) {
  const $tweet = $(`<article class="tweet">
  <header class="tweets-header">
    <span class="id"> <img src=${tweetObj.user.avatars}>${tweetObj.user.name}</span>
    <span class="handle">${tweetObj.user.handle}</span>
  </header>
  ${tweetObj.content.text}
  <footer>
    ${tweetObj.created_at}
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-sharp fa-solid fa-heart"></i>
  </footer>
</article><br>`);
  return $tweet;
};

$(document).ready(function () {
  const renderTweets = function (arrOfTweetObjs) {
    for (const obj of arrOfTweetObjs) {
      //leverage createTweetElement function by passing in the tweet object
      const tweet = createTweetElement(obj);
      //use returned jQuery obj by appending each one to the #tweets-container
      $(".tweets").append(tweet);
    }
  };
  //first function call when the DOM loads
  renderTweets(data);

  //handler function submit form data and display new tweet using jQuery so that the page doesn't need to refresh
  const createTweetWithAJAX = function (event) {
    // prevent default behaviour of submit event (data submission and page refresh)
    event.preventDefault();
    //wrap jquery around the form (event.target) to call .serialize on it,
    // allowing us to turns a set of form data into a query string
    const data = $(event.target).serialize();
    // create AJAX POST request that sends to the server the encoded data string
    $.ajax({
      url: "/tweets",
      data: data,
      type: "post",
      //success will run when we get back a succesful http response (200)
      success: (data) => {
        console.log("post request was successful", data);
        // renderTweets(data);
      },
    });
  };
  //second function call after dom loads, on submit
  // add event listenter for submit and call createTweetWithAJAX
  $("form").on("submit", createTweetWithAJAX);
});
