//will only run once the page DOM is ready for JavaScript code to execute
$(document).ready(function () {
  //calculate the character count
  $("#tweet-text").on("input", function () {
    const charCount = 140 - $(this).val().length;

    //update value of counter
    const form = $(this).closest("form");
    const output = form.find("output.counter");
    // const children = form.children(); //returns a set
    // const div = children.first().next();
    // const span = div.children().first().next();
    // const output = span.children();
    if (charCount < 0) {
      output.addClass("red");
    } else {
      output.removeClass("red");
    }

    output.text(charCount);

    // if (charCount > 140) {
    //   console.log(140 - charCount);
    // } else {
    //   console.log(charCount);
    // }
  });

  //this refers to the element on which the event triggered?
});
