// add current day to display at top of page under header
//  - will add text content of current day and append to the <p> element in the header in the format 'Name of Day', 'Full name of month', 'Numerical Day with suffix th or st'
// add time blocks to div container using jquery (3 columns in a row, 9 rows):
//  - first time in format '12AM'
//  - then task container
//  - then save icon
// create formatting feature to color code time block:
//  - grey for past
//  - red for in progress
//  - green for upcoming
// add functionality so when user clicks into time block:
//  - can edit the text content on focus
//  - hardcode the content on blur
// when user clicks the save button icon the text for the event saves into local storage via an array object
// when user refreshes page - get the object array from local storage and recreate the events on the page

// ** GLOBAL VARIABLES ** // 

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
    }

    // Event listener for saving the event to local storage
    saveButton.on("click", function () {
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
