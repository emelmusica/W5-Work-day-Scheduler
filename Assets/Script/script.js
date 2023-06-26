// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // Display current date
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);

  // Apply the past, present, or future class to each time block by comparing the id to the current hour.
  var currentHour = dayjs().hour();
  $(".container-fluid .time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    if (timeBlockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // Save user input to local storage
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userEvent = $(this).siblings(".description").val().trim();

    localStorage.setItem(timeBlockId, userEvent);
  });

  // Load saved events from local storage
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedEvent = localStorage.getItem(timeBlockId);

    if (savedEvent) {
      $(this).find(".description").val(savedEvent);
    }
  });
});
