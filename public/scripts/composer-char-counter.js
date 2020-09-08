//Check doc ready so nothing can be executed before page content is loaded in full
$(document).ready(() => {
  console.log("document is ready");
  //add a jQuery event listeneer
  //use $selector.event((event) => {console.log(event)});
  //listen for one of: change, keydown, keyup, blur, keypress;
  //try console log 'this'
  //use the function keyword not fat arrow
  //use this to grab the textarea value's length
  let textarea = $('textarea');
  let counter = $('#charCounter');
  textarea.on('keyup', function() {
    let inputLength = this.value.length; 
    let charsRemaining = 140 - inputLength;
    counter.text(charsRemaining);
  });
})