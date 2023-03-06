//function - takes in array of tweet objects, prepends new tweet element in tweets section of index.html
const renderTweets = function (arrOfTweetObjs) {
  //clear the tweet container before populating tweets so that there are no duplicates
  $(".tweets").empty();
  for (const obj of arrOfTweetObjs) {
    //leverage createTweetElement function by passing in the tweet object
    const tweet = createTweetElement(obj);
    //use returned jQuery obj by appending each one to the .tweets section
    $(".tweets").prepend(tweet);
  }
};
