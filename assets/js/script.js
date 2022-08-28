var breedDropdown = document.querySelector("#breed-search-bar");
var randomButton = document.querySelector("#random-button");
var dogBox = document.querySelector("#dog-box");
var adoptionBox = document.querySelector("#adoption-info");
var favoritesDropdown = document.querySelector("#favorites");

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

                // adds breed name for each image
                var breedName = document.createElement("span");
                breedName.textContent = data.message[i].split("/")[4];

                // appends breed name and images to div
                dogBox.appendChild(breedName);
                dogBox.appendChild(dogPicture);
            }
        })
    })
}

var pf = new petfinder.Client({apiKey: "gLhpVfdeL124JS6DypuD9akf6FplZYPYXpt97ZVUxwngihkFkK", secret: "srVvrkf10LY9NeiQJwvxOTUJ1yBFmakyDs3W39do"});

// sets adoption information into adoption div
var adoptionFetch = function() {
    pf.animal.search()
        .then(function (response) {
            console.log(response.data.animals);
            for (i = 0; i < 5; i++) {
                // creates span for dog name w/ link to adoption
                var dogName = document.createElement("span");
                dogName.textContent = response.data.animals[i].name;
                dogName.classList.add("fa", "fa-star");
                adoptionBox.appendChild(dogName);

                // span for description
                var dogDescription = document.createElement("span");
                dogDescription.textContent = response.data.animals[i].description;
                adoptionBox.appendChild(dogDescription);

                // more info button
                var moreInfo = document.createElement("a");
                moreInfo.textContent = "Click here for more info!";
                moreInfo.setAttribute("href", response.data.animals[i].url);
                moreInfo.setAttribute("target", "_blank");
                adoptionBox.appendChild(moreInfo);
            }
            
            // function to add clicked favorite to favorite drop down
            var addFavorite = function(event) {
                var targetEl = event.target;

                if (targetEl.matches(".fa")) {
                    targetEl.classList.toggle("checked");
                }
            }
            
            adoptionBox.addEventListener("click", addFavorite);
        })
    }

dogSelections();
randomButton.addEventListener("click", randomDogs);
adoptionFetch();