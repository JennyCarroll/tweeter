// function - takes in tweet object and returns $tweet container holding jQuery string
// html article element populated with object data
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
