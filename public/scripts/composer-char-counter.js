$(document).ready(() => {

  $("#tweet-text").on("input", function(event) {
    
    let $textInput = $(this);
    let $textLength = $textInput.val().length;
    let $counterSelected = $textInput.closest("form").find(".counter");
    let $counterValue = 140 - $textLength;

    $counterSelected.text($counterValue);

    if ($counterValue < 0) {
      $("#counter").css("color", "red");
    } else {
      $("#counter").css("color", "#425252");
    }
  });
});


