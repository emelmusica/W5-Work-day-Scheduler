$(function () {
    // Get the current date using Day.js and display it in the header
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  
    // Add a click event listener to the save button
    $(".saveBtn").on("click", function () {
      // Get the parent time-block element and its id
      var timeBlock = $(this).parent();
      var timeBlockId = timeBlock.attr("id");
  
      // Get the user input from the textarea
      var userInput = timeBlock.find(".description").val();
  
      // Save the user input in local storage using the time-block id as the key
      localStorage.setItem(timeBlockId, userInput);
    });
  
    // Function to update the time block colors
    function updateTimeBlockColors() {
      // Get the current hour in 24-hour format
      var currentHour = dayjs().format("H");
  
      // Loop through each time block
      $(".time-block").each(function () {
        var timeBlock = $(this);
        var timeBlockId = timeBlock.attr("id");
  
        // Remove any past, present, and future classes
        timeBlock.removeClass("past present future");
  
        // Compare the time block id with the current hour and apply the appropriate class
        if (timeBlockId < currentHour) {
          timeBlock.addClass("past");
        } else if (timeBlockId === currentHour) {
          timeBlock.addClass("present");
        } else {
          timeBlock.addClass("future");
        }
      });
    }
  
    // Load any saved user input from local storage and set the textarea values
    function loadSavedUserInput() {
      // Loop through each time block
      $(".time-block").each(function () {
        var timeBlock = $(this);
        var timeBlockId = timeBlock.attr("id");
  
        // Get the saved user input from local storage using the time-block id as the key
        var userInput = localStorage.getItem(timeBlockId);
  
        // Set the textarea value with the saved user input
        timeBlock.find(".description").val(userInput);
      });
    }
  
    // Call the functions to initially set up the page
    updateTimeBlockColors();
    loadSavedUserInput();
  
    // Update the time block colors every minute
    setInterval(updateTimeBlockColors, 60000);
  });
  