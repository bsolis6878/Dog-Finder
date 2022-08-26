var breedDropdown = document.querySelector("#breed-search-bar");
var randomButton = document.querySelector("#random-button");
var dogBox = document.querySelector("#dog-box");

// adds dropdown option for every breed
var dogSelections = function() {
    var apiUrl =  "https://dog.ceo/api/breeds/list/all"

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            for (i = 0; i < Object.keys(data.message).length; i++) {
                var dogOption = document.createElement("option");
                dogOption.textContent = Object.keys(data.message)[i];
                breedDropdown.appendChild(dogOption);
            }
        })
    })
}

// displays random pictures with breed names when random button is clicked
var randomDogs = function() {
    var apiUrl = "https://dog.ceo/api/breeds/image/random/3";

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            dogBox.innerHTML = "";
            for (i = 0; i < Object.keys(data.message).length; i++) {
                // creates img elements
                var dogPicture = document.createElement("img");
                dogPicture.setAttribute("src", data.message[i]);
                dogPicture.className = "images";

                // adds breed for each image
                var breedName = document.createElement("span");
                breedName.textContent = data.message[i].split("/")[4];
                dogBox.appendChild(breedName);

                dogBox.appendChild(dogPicture);
                console.log(data.message[i]);
            }
        })
    })
}

dogSelections();
randomButton.addEventListener("click", randomDogs);
