//handler function - submits form input data, displays a new tweet using jQuery
const createTweetWithAJAX = function (event) {
  // prevent default behaviour of submit event
  event.preventDefault();
  // validation check that disallows form submission if tweet area is empty or exceeds 140 characters
  // const textAreaContent = $("#tweet-text").val();
  const textAreaContent = event.target[0].value;
  console.log("textAreaContent:", textAreaContent);
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
    type: "application/json",
    method: "post",
    success: () => {
      //clear the textarea by assigning its value to an empty string
      $("textarea").val("");
      //reset the counter to 140 characters
      charCountReset();
      //call load tweets to render the new tweet, prepending it to the tweets container
      // loadTweets();
      $.ajax("/tweets", { method: "GET" }).then((arrOfTweets) => {
        const tweet = createTweetElement(arrOfTweets.slice(-1)[0]);
        $(".tweets").prepend(tweet);
      });
    },
  });
};
