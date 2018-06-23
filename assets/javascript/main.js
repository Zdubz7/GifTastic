// This is the initial array that houses the animal examples provided
var animalsArray =
    ["Squirrel",
        "Bear",
        "Monkey",
        "Fox",
        "Cat",
        "Fish",
        "Bird",
        "Dog"];

// This screen loads the 
$(document).ready(function () {
    for (var i = 0; i < animalsArray.length; i++) {
        $("#animal-buttons").append("<button type='button' onclick='searchGif(\"" + animalsArray[i] + "\")' class='btn btn-primary' value=' " + animalsArray[i] + "'> " + animalsArray[i] + " </button>");
    }
});

// This function allows the animal-blank to be diplayed so that the user can search for an animal gif he or she chooses.
function animalButtonClicked() {
    var userBlank = $('#animal-blank').val();
    searchGif(userBlank);
}

// This function ads an animal to the animalsArray after the user types in the animals name in the animal-input field.
function submitButtonClicked() {
    var userContribution = $('#animal-blank').val();

    if (userContribution) {
        $('#animal-buttons').append("<button type='button' onclick='searchGif(\"" + userContribution + "\")' class='btn btn-primary' value=' " + userContribution + "'> " + userContribution + " </button>");
    }
}

// This function grabs the data for the gif to be displayed with the API key I recieved from Giphy.
function searchGif(animalName) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q= " + animalName + " &api_key=G5lKYQqhZMl4xEfrp4BXng96HMsivBHV",
        type: "GET",
    })
        .done(function (response) {
            displayGif(response);
        });
}

// This function displays the rating for the image gif
function displayGif(response) {
    $('#animals').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:200px; height:200px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#animals').append(image);
    }

    // This function creates the animation when you click the selected gif
    $('.movImage').on('click', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}