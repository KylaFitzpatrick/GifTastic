var topics = ["wolf", "cat", "pig", "elephant", "lion", "tiger", "bear"]

$("#buttons-view").on("click", ".animal", function (event) {
    event.preventDefault();
    var topic = $(this).attr("data-name");
    displayAnimalInfo(topic);
});

//display buttons
function displayAnimalInfo(topic) {


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=z7ZwGCoe8mJjUtLipIsTdyr00UdlZVgk&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
        // After data comes back from the request
    }).then(function (response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // looping the result item
        for (var i = 0; i < results.length; i++) {

            // display only g and pg
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                // storing a div tag
                var animalDiv = $("<div id='animalGifs'>");

                // result item's rating in p tag
                var p = $("<p>").text("Rating: " + results[i].rating);

                // storing an image tag
                var animalImage = $("<img>");
                // src attribute of the image from result item
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("class", "gif");

                // appending p and img tag to the animalDiv
                animalDiv.append(animalImage);
                animalDiv.append(p);
                

                // prepend the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(animalDiv);
            }
        }
    });
}


$("#gifs-appear-here").on("click", ".gif", function () {
    // event.preventDefault();
    // attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // clicked image's state is still, update its src attribute data-animate value
    // set the image's data-state to animate
    // else set src to the data-still value
    // set the image's data-state to still
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// function for displaying movie data
function renderButtons() {

    // delete the animals before adding new animals
    $("#buttons-view").empty();

    // loop through array of animals
    for (var i = 0; i < topics.length; i++) {

        // buttons for each animal in the array
        var a = $("<button>");
        // add a class of animal to button tag
        a.addClass("animal");
        // add a data-attribute
        a.attr("data-name", topics[i]);
        // display button text
        a.text(topics[i]);
        // add button to buttons-view div
        $("#buttons-view").append(a);
    }
}
// function when animal button is clicked 
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // input from the textbox
    var animal = $("#animal-input").val().trim();

    // add animal from the textbox to array
    topics.push(animal);

    // renderButtons via animal array
    renderButtons();

});

renderButtons();

