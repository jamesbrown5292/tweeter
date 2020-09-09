/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
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


  const createTweetElement = (tweetObject) => {
    const $tweet = $(` <article>
    <header>
      <div class="username-with-icon">
        <i class="fas fa-user-astronaut"></i>
        <p>${tweetObject.user.name}</p>
      </div>
      <p class="hide">${tweetObject.user.handle}</p>
    </header>
    <p class="tweet-article-body">${tweetObject.content.text}</p>
    <footer>
      <p>${tweetObject.created_at}</p>
      <div class="like-fav-retweet-icons">
        <i class="fas fa-heart"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-flag"></i>
      </div>
    </footer>
  </article>`);
    return $tweet;
  };

  const renderTweets = (tweets) => {
    //loop through the tweets
    //calls createElement on each tweet
    //takes the value and appends to container
    const $allTweetsSection = $('.all-users-tweets');
    $allTweetsSection.empty();

    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      console.log($tweet);
      $allTweetsSection.append($tweet);
    }
  };

  const $postTweetForm = $('.tweet-box')
  $('postTweetForm').on('submit', function (event) {
    event.preventDefault();
    const serializedData = this.serialize();
    $.post('/tweets/', serializedData)
      .then((response) => {console.log(response)});
  })




  //renderTweets(data);
});
