/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* GO back and append jQuery lines one at a time */
$(() => {
  $('.alert-messaging').hide();
  $('.arrowicon').effect('bounce', "fast");

  let tweetIdNum = 0;
  const createTweetElement = (tweetObject) => {

    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    const $tweet = $(` <article>

          <header>
            <div class="username-with-icon">
              <i class="fas fa-user-astronaut"></i>
              <p>James</p>
            </div>
            <p class="hide">${tweetObject.user.handle}</p>
          </header>

          <p class="tweet-article-body">${escape(tweetObject.content.text)}</p>

          <footer>
            <p>${tweetObject.created_at}</p>
            <div class="like-fav-retweet-icons">
              <i class="fas fa-heart"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-flag"></i>
            </div>
          </footer>`)

    return $tweet;
  };

  const $allTweetsSection = $('.all-users-tweets');

  const renderTweets = (tweets) => {
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


  $('#new-tweet').hide();
    
  const $composeTweetBoxSection = $('.new-tweet');
  $('.write-tweet-button-container').on('click', function() {
    $composeTweetBoxSection.slideDown("2000");
  });


  const $postTweetForm = $('.tweet-box'); //this class name is confusing. 
  $postTweetForm.on('submit', function(event) {
    event.preventDefault();
    $('.alert-messaging').hide();
    const $textarea = $('textarea');
    const $tweetContent = $textarea.val();
    const $writeTweetBox = $('.tweet-box')
    const $alertBoxContainer = $('.alert-box-container');
    const $alertBox = $('.alert-messaging');
    const $newTweetBox = $('.new-tweet')
    
    const removeAlertElements = () => {
      $('.alert-messaging').remove();
      $('.alert-box-container').remove();
    };

    const insertAlertElements = (alertMessage) => {
      $alertBox.text(alertMessage).slideDown("2000");
      //$alertBoxContainer.slideDown("2000")
    };
    
    if (!$tweetContent.length || $tweetContent === null) {
      const alertMessage = '\u26A0 ' +  'You can\'t post an empty tweet. That would be silly.' + ' \u26A0'
      insertAlertElements(alertMessage);


    } else if ($tweetContent.length > 140) {
      const alertMessage = '\u26A0 ' + 'Your tweet is too long. Keep it to 140 characters or less!' + ' \u26A0'
      //removeAlertElements();
      insertAlertElements(alertMessage)
    } else {
      const serializedData = $(this).serialize();
      //removeAlertElements();

      $.post('/tweets/', serializedData)
        .then((response) => {
          $allTweetsSection.empty();
          $textarea.val('');
          loadTweets();
        });
    };

  });
});

//Leave high level comments for the endpoint behaviours, don't detail the code. 
