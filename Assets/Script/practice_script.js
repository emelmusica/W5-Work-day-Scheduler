$(document).ready(function() {

  function displayCurrentDay() {
    var currentDate = dayjs().format("dddd, MMMM DD");
    $("#currentDay").text(currentDate);
  }

  function createTimeBlocks() {
    var container = $(".container-fluid");
    var currentHour = dayjs().hour();

    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $("<div>").addClass("row time-block");
      var hourColumn = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(dayjs().hour(hour).format("hA"));
      var descriptionColumn = $("<textarea>").addClass("col-8 col-md-10 description");
      var saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").html("<i class='fas fa-save' aria-hidden='true'></i>");

      if (hour < currentHour) {
        descriptionColumn.addClass("past");
      } else if (hour === currentHour) {
        descriptionColumn.addClass("present");
      } else {
        descriptionColumn.addClass("future");
      }

      var savedEvent = localStorage.getItem("event_" + hour);
      if (savedEvent) {
        descriptionColumn.val(savedEvent);
        if (hour === currentHour) {
          $("<div>").addClass("appointment-added").text("Appointment Added to localStorage").insertAfter(hourColumn);
        }
      }

      saveButton.on("click", function() {
        var event = $(this).siblings(".description").val();
        var hour = $(this).parent().attr("id").split("-")[1];
        localStorage.setItem("event_" + hour, event);
      });

      timeBlock.attr("id", "hour-" + hour);
      timeBlock.append(hourColumn, descriptionColumn, saveButton);
      container.append(timeBlock);
    }
  }

  displayCurrentDay();
  createTimeBlocks();
});
