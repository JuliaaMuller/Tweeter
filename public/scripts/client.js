/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = [{
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
},
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = (tweetData) => {
  const profileName = tweetData["user"]["name"];
  const profileHandle = tweetData["user"]["handle"];
  const profilePicture = tweetData["user"]["avatars"];
  const contentText = tweetData["content"]["text"];
  const date = tweetData["created_at"];
  const dateUpToNow = timeago.format(date);
  const articleTweet = `
  <article>
    <div class="article">
  <header>
  <div class="profile-picture-container">
      <img alt="profile-picture" src="${profilePicture}"> 
  </div>
      <h3 class="profile-name">${profileName}</h3>
      <h3 class="handle-name">${profileHandle}</h3>
    </header>
    <p class="tweet">${contentText} </p>
  <footer class="old-tweet-footer">
    <p class="date">${dateUpToNow}</p>
    <div class="icones">
      <i id="flag-icon" class="fa fa-flag"></i>
      <i id="retweet-icon" class="fa fa-retweet"></i>
      <i id="heart-icon" class="fa fa-heart"></i>
    </div>
  </div>
</div>
</article>
`;
return articleTweet;
};

const renderTweets = (tweets) => {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets)
  {
    const $newTweet = createTweetElement(tweet)
    $('.old-tweet').append($newTweet);
  }
};

$(document).ready(() => { 
  $.ajax({
    url:"/tweets/",
    method: 'POST',
  })
  .done((results) => {
    //getting the result; 
    console.log(results)
  })
  .fail((error) => {
console.log(`Error: ${errormessage}`);
  })
  .always(() => console.log("request to tweeter done"));
renderTweets(tweetData)
  });

