/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* GO back and append jQuery lines one at a time */
$(() => {
  let tweetIdNum = 0;
  const createTweetElement = (tweetObject) => {
    const $tweet = $(` <article id="${tweetIdNum}">
    <header>
      <div class="username-with-icon">
        <i class="fas fa-user-astronaut"></i>
        <p>${tweetObject.user.name}</p>
      </div>
      <p class="hide">${tweetObject.user.handle}</p>
    </header>
    `)
    $tweet.append($("<p>").addClass("tweet-article-body").text(tweetObject.content.text));
    $tweet.append(`<footer>
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

  const $allTweetsSection = $('.all-users-tweets');

  const renderTweets = (tweets) => {
    //loop through the tweets
    //calls createElement on each tweet
    //takes the value and appends to container
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
  };
  loadTweets();
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
    } else {
      const serializedData = $(this).serialize();
      $.post('/tweets/', serializedData)
        .then((response) => {
          console.log(response);
          $allTweetsSection.empty();
          $textarea.val('');
          loadTweets();
        });
    }
  });



});

//Leave high level comments for the endpoint behaviours, don't detail the code. 
