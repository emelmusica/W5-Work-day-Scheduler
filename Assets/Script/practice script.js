/* execute code when the DOM is fully loaded*/
$(document).ready(function() {

    // Function to get the current date and display it in the header
    function displayCurrentDay() {
      var currentDate = moment().format("dddd, MMMM Do");
      $("#currentDay").text(currentDate);
    }
  
    // Function to create the time blocks
    function createTimeBlocks() {
      var container = $(".container");
      var currentHour = moment().hour();
  
      for (var hour = 9; hour <= 17; hour++) {
        var timeBlock = $("<div>").addClass("row time-block");
        var hourColumn = $("<div>").addClass("col-1 hour").text(moment(hour, "H").format("hA"));
        var descriptionColumn = $("<textarea>").addClass("col-10 description");
        var saveButton = $("<button>").addClass("col-1 saveBtn").html("<i class='fas fa-save'></i>");
  
        // Set color code for past, present, and future time blocks
        if (hour < currentHour) {
          descriptionColumn.addClass("past");
        } else if (hour === currentHour) {
          descriptionColumn.addClass("present").removeClass("future");
        } else {
          descriptionColumn.addClass("future");
        }
  
        // Additional condition to make 1pm to 5pm blocks green
        if (hour >= 13 && hour <= 17) {
          descriptionColumn.removeClass("past present future").addClass("future");
        }
  
        // Retrieve saved event from local storage
        var savedEvent = localStorage.getItem("event_" + hour);
        if (savedEvent) {
          descriptionColumn.val(savedEvent);
          if (hour === currentHour) {
            $("<div>").addClass("appointment-added").text("Appointment Added to localStorage").insertAfter(hourColumn);
          }
        }
  
        // Event listener for saving the event to local storage
        saveButton.on("click", function() {
          var event = $(this).siblings(".description").val();
          var hour = $(this).parent().attr("data-hour");
          localStorage.setItem("event_" + hour, event);
        });
  
        timeBlock.attr("data-hour", hour);
        timeBlock.append(hourColumn, descriptionColumn, saveButton);
        container.append(timeBlock);
      }
    }
  
    // Call the functions to initialize the page
    displayCurrentDay();
    createTimeBlocks();
  });
  