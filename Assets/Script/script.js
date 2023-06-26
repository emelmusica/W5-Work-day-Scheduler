// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".container-fluid.px-5 > div").attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  var currentHour = dayjs().hour();
  $(".container-fluid.px-5 > div").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
  
    if (timeBlockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });  

  $(".container-fluid.px-5 > div").each(function () {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);

    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });

  var currentDate = dayjs().format("dddd, MMMM DD");
  $("#currentDay").text(currentDate);
});
