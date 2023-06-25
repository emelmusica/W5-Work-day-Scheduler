// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    // Get the id of the containing time-block.
    var timeBlockId = $(this).closest(".time-block").attr("id");

    // Get the user input from the description textarea.
    var userInput = $(this).siblings(".description").val();

    // Save the user input in local storage using the time block id as the key.
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block by comparing the id to the current hour.
  var currentHour = dayjs().hour();
  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });