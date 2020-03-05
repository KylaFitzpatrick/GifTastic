    var topics = ["wolf", "cat", "pig", "elephant", "lion", "tiger", "bear"]
    $("#buttons-view").on("click", function(event) {
        event.preventDefault();
    displayAnimalInfo();
    });
    //display buttons
    function displayAnimalInfo() {

        var topic = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=z7ZwGCoe8mJjUtLipIsTdyr00UdlZVgk&limit=10";

         // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
        // After data comes back from the request
      }).done(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);
            // animalImage.attr("src", animalImage.attr("data-still"));
            animalImage.attr("data-state", "still")
            animalImage.attr("data-still", results[i].images.fixed_height.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.addClass("gif")
            
            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(animalDiv);
            }
          }
        });
    }

        $(".gif").on("click", function() {
            alert("clicked")
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            }
        });
    // $("#buttons-view").on("click", function(event) {
    //     event.preventDefault();
    // displayAnimalInfo();
    // });
    // Function for displaying movie data
    function renderButtons() {

        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
     // This function handles events where a animal button is clicked
     $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        
        // Adding animal from the textbox to our array
        topics.push(animal);
        
        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
        
      });

    //   $('#animal-input').keyup(function(event) {
    //     var input=$(this);
    //     var animalText=$(this).val();
    //     console.log(animalText);
    //     if(animalText){
    //         input.removeClass("invalid").addClass("valid");
    //     }else{
    //         input.removeClass("valid").addClass("invalid");
    //     }	
    // });

      // Adding a click event listener to all elements with a class of "animal"
      $(document).on("click", ".animal", displayAnimalInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
 