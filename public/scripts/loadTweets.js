//function - retrieves a list of tweets from the database (backend)
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
