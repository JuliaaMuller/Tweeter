/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
//   {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
];

// To avoid someone to XSS the page;
const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Function to create a tweet with the HTML format;
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
      <h4 class="profile-name-old">${profileName}</h4>
      <h3 class="handle-name">${profileHandle}</h3>
    </header>
    <p class="tweet">${escape(contentText)} </p>
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

// Function that calls createTweetElement for each tweet in db;
const renderTweets = (tweets) => {
  tweets.reverse();
  for (let tweet of tweets) {
    const $newTweet = createTweetElement(tweet);
    $('.old-tweet').append($newTweet);
  }
};

// Function to render all tweet registered in db;
const loadTweets = () => {
  $.ajax({
    url:"/tweets",
    type: "GET",
    dataType : "JSON",
  })
    .then((data) => {
      renderTweets(data);
    });
};

// Function to check if tweetText from the tweet-box is too long;
const tweetTooLong = (tweetText) => {
  if (tweetText.length > 140) {
    return true;
  }
};

// Function to check if tweetText from the tweet-box is null;
const tweetIsNull = (tweetText) => {
  if (tweetText.length === 0) {
    return true;
  }
};

// Function for a post request to post a new tweet;
const postTweet = ()=>{
  form = $('.new-tweet').find('form');
  $.ajax({
    url: "/tweets/",
    method:"POST",
    data: form.serialize(),
    success: () => {
      $(".old-tweet").empty();
      $("#tweet-text").val('');
      $("#counter").val(140);
      loadTweets();
    }
  });
};

// Loads when document is ready;
$(document).ready(() => {
  loadTweets(tweetData); // Loads old tweets when the document is ready;
  // Handle the submit action when posting a new tweet;
  $('.new-tweet').on("submit",(event) => {
    event.preventDefault();
    textContent = $(".tweet-box").find("textarea").val();
    if (tweetTooLong(textContent)) {
      $(".alert").empty().append('<p><i class="fa fa-exclamation-triangle"></i> Your tweet is too long! Please respect the limit of 140 char <i class="fa fa-exclamation-triangle"></i></p>');
      $(".alert").hide().fadeIn("slow");
    } else if (tweetIsNull(textContent)) {
      $(".alert").empty().append("<p><i class='fa fa-exclamation-triangle'></i> You don't have a tweet to submit! <i class='fa fa-exclamation-triangle'></i></p>");
      $(".alert").hide().fadeIn("slow");
    } else {
      postTweet();
    }
  });
});

