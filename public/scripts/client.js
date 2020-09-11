

$(() => {
  //Hide any existing alerts and text input and initiate icon bounce
  $('.alert-messaging').hide();
  $('.arrowicon').effect('bounce', "fast");
  $('#new-tweet').hide();

  const createTweetElement = (tweetObject) => {

    //escape function to prevent XSS
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //timestamp conversion
    const convertTime = function(timestamp) {
      const rightNow = new Date();
      const millisecondsAgo = rightNow - timestamp;
      const daysAgo = Math.floor(millisecondsAgo / 86400000);
      const hoursAgo = Math.floor(millisecondsAgo / 3600000);
      const yearsAgo = Math.floor(millisecondsAgo / 31536000000);
      if (daysAgo < 1) {
        if (hoursAgo > 1) {
          return hoursAgo + " hours ago";
        } else if (hoursAgo === 1) {
          return hoursAgo + " hour ago";
        } else {
          return "Within the last hour";
        }
      } else if (daysAgo === 1) {
        return daysAgo + " day ago";
      } else if (daysAgo >= 365 && daysAgo < 730) {
        return yearsAgo + " year ago";
      } else {
        return yearsAgo + " years ago";
      }
    };

    
    const $tweet = $(` <article>
          <header>
            <div class="username-with-icon">
              <img src="${tweetObject.user.avatars}" class="avatar">
              <p>${tweetObject.user.name}</p>
            </div>
            <p class="hide">${tweetObject.user.handle}</p>
          </header>
          <p class="tweet-article-body">${escape(tweetObject.content.text)}</p>
          <footer>
            <p>${convertTime(tweetObject.created_at)}</p>
            <div class="like-fav-retweet-icons">
              <i class="fas fa-heart"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-flag"></i>
            </div>
          </footer>`);
    return $tweet;
  };

  const $allTweetsSection = $('.all-users-tweets');
  const $textInputField = $('textarea');
  const $composeTweetSection = $('.new-tweet');
  const $postTweetForm = $('.tweet-box'); //this class name is confusing.

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

  $('.write-tweet-button-container').on('click', function() {
    $composeTweetSection.slideDown("2000");
    $textInputField.focus();
  });


  $postTweetForm.on('submit', function(event) {
    event.preventDefault();
    $('.alert-messaging').hide();
    const $tweetContent = $textInputField.val();
    const $alertBox = $('.alert-messaging');
    const insertAlertElements = (alertMessage) => {
      $alertBox.text(alertMessage).slideDown("2000");
    };
    
    if (!$tweetContent.length || $tweetContent === null) {
      const alertMessage = '\u26A0 ' +  'You can\'t post an empty tweet. That would be silly.' + '  \u26A0';
      insertAlertElements(alertMessage);
    } else if ($tweetContent.length > 140) {
      const alertMessage = '\u26A0 ' + 'Your tweet is too long. Keep it to 140 characters or less!' + '  \u26A0';
      insertAlertElements(alertMessage);
    } else {
      const serializedData = $(this).serialize();

      $.post('/tweets/', serializedData)
        .then((response) => {
          $allTweetsSection.empty();
          $textInputField.val('');
          loadTweets();
        });
    }
  });
});

