//runs when the dom is loaded
$(document).ready(function () {
  //event handler on input to the textarea, calculate the character count
  $("#tweet-text").on("input", function () {
    const charCount = 140 - $(this).val().length;
    const form = $(this).closest("form");
    const output = form.find("output.counter");
    if (charCount < 0) {
      output.addClass("red");
    } else {
      output.removeClass("red");
    }
    output.text(charCount);
  });
});

function charCountReset() {
  const charCount = 140;
  const form = $("#tweet-text").closest("form");
  const output = form.find("output.counter");
  output.text(charCount);
}
