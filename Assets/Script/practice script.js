$(function () {
  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    // Get the id of the containing time-block.
    var timeBlockId = $(this).closest(".time-block").attr("id");

    // Get the user input from the textarea.
    var userInput = $(this).siblings(".description").val();

    // Save the user input in local storage using the time-block id as the key.
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block.
  var currentHour = dayjs().format("H");
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

  // Get any user input saved in localStorage and set the values of the corresponding textarea elements.
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);

    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });

  // Display the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});
