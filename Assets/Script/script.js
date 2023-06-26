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

  var currentHour = dayjs().hour();
  $(".container-fluid.px-5 .time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
  
    if (timeBlockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });  

  // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);

    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });

  // Display the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM DD");
  $("#currentDay").text(currentDate);
});
