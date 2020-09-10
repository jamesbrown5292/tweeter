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
    const $writeTweetBox = $('.tweet-box')
    const $alertBox = $('<div class="alert-messaging"></div>')
    if (!$tweetContent.length) {
      $('.alert-messaging').remove();
      $writeTweetBox.prepend($alertBox);
      $alertBox.text('You can\'t post an empty tweet. That would be silly.')
    } else if ($tweetContent === null) {
      $('.alert-messaging').remove();
      $writeTweetBox.prepend($alertBox);
      $alertBox.text('You can\'t post an empty tweet. That would be silly.')
    } else if ($tweetContent.length > 140) {
      $('.alert-messaging').remove();
      $writeTweetBox.prepend($alertBox);
      $alertBox.text('Your tweet is too long. Keep it to 140 characters or less!')
    } else {
      $('.alert-messaging').remove();
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
