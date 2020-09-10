/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

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
      $allTweetsSection.append($tweet);
    }
  };

  const loadTweets = function() {

    $.ajax('/tweets/', {type: "get"})
      .then((tweets) => {
        renderTweets(tweets);
      })
      .fail((error) => {
        console.log(error, "We couldn't find any tweets");
      });

  }();

  const $postTweetForm = $('.tweet-box'); //this class name is confusing. 


  $postTweetForm.on('submit', function(event) {
    event.preventDefault();
    const $textarea = $('textarea');
    const $tweetContent = $textarea.val();
    if (!$tweetContent.length) {
      alert('You need to write something before you tweet.')
    } else if ($tweetContent === null) {
      alert('Sorry, that\'s not a valid tweet');
    } else if ($tweetContent.length > 140) {
      alert('Your tweet is too long! Tweets must be 140 characters or less.');
    }

    console.log();
    const serializedData = $(this).serialize();
    console.log(serializedData);
    $.post('/tweets/', serializedData);
  });



});

//Leave high level comments for the endpoint behaviours, don't detail the code. 
