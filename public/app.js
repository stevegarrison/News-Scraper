// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<p id='article-title'>" + data[i].title + "</p>" + "<p id='article-summary'>" + data[i].summary + "</p>" + "<a href='" + data[i].link + "' target='_blank'>" + "Link" + "</a>" + "<a class='ml-3' id='this-note' data-id='" + data[i]._id + "' href='" + "" + "'>" + "Note" + "</a>" + "</p>" + "<hr>");
  }
});

// Whenever someone clicks a p tag
$(document).on("click", "#this-note", function () {
  event.preventDefault();
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<div class='col-md-12'><h4>" + data.title + "</h4></div>");
      // An input to enter a new title
      $("#notes").append("<div class='col-md-12'><input class='w-100' id='titleinput' name='title' ></div>");
      // A textarea to add a new note body
      $("#notes").append("<div class='col-md-12 mt-2'><textarea class='w-100' id='bodyinput' name='body'></textarea></div>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<div class='col-md-12 mt-2'><button class='w-100' data-id='" + data._id + "' id='savenote'>Save Note</button></div>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId);
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});