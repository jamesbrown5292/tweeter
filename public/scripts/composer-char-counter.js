//This calculates the characters remaining for the tweet and affects the color of the text based on if there are enough characters remaining
$(document).ready(() => {
  console.log("document is ready");
  let textarea = $('textarea'); //don't be too general with this - make more speciic
  let counter = $('#tweet-char-counter');
  textarea.on('input', function({ target }) {
    let inputLength = target.value.length; 
    let charsRemaining = 140 - inputLength;
    if ( charsRemaining > 0 ) {
      counter.text(charsRemaining).css({color: "#545149"});
    } else {
      counter.text(charsRemaining).css({color: "red"});
    }
  });
})