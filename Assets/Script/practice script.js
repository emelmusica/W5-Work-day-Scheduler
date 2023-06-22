$(function () {
    // Add a listener for click events on the save button.
    $(".saveBtn").on("click", function () {
      var timeBlockId = $(this).closest(".time-block").attr("id");
      var userInput = $(this).siblings(".description").val();
      localStorage.setItem(timeBlockId, userInput);
    });
  
    // Apply the past, present, or future class to each time block.
    function updateTimeBlocks() {
      var currentHour = dayjs().format("H");
      $(".time-block").each(function () {
        var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
  
        if (timeBlockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (timeBlockHour == currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
  
    // Get any user input saved in localStorage and set the values of the corresponding textarea elements.
    function populateSavedEvents() {
      $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        var savedEvent = localStorage.getItem(timeBlockId);
  
        if (savedEvent) {
          $(this).find(".description").val(savedEvent);
        }
      });
    }
  
    // Display the current date in the header of the page.
    function displayCurrentDate() {
      var currentDate = dayjs().format("dddd, MMMM D, YYYY");
      $("#currentDay").text(currentDate);
    }
  
    updateTimeBlocks();
    populateSavedEvents();
    displayCurrentDate();
  });
  