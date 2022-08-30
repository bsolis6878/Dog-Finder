var randomButton = document.querySelector("#random-button");
var dogBox = document.querySelector("#dog-box");
var adoptionBox = document.querySelector("#adoption-info");
var favoritesBox = document.querySelector("#favorites");

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
                breedName.appendChild(dogPicture);
                dogBox.appendChild(breedName);
            }
        })
    })
}

var pf = new petfinder.Client({apiKey: "gLhpVfdeL124JS6DypuD9akf6FplZYPYXpt97ZVUxwngihkFkK", secret: "srVvrkf10LY9NeiQJwvxOTUJ1yBFmakyDs3W39do"});

// sets adoption information into adoption div
var adoptionFetch = function(location) {
    pf.animal.search(location)
        .then(function (response) {
            console.log(response.data.animals);
                for (i = 0; i < 5; i++) {
                    if (response.data.animals[i].species === "Dog"); {
                        // creates div to put each entry into
                        var singleAdoption = document.createElement("div");
                        singleAdoption.classList.add("flex", "flex-col", "copy");
                        adoptionBox.appendChild(singleAdoption);

                        // creates span for dog name
                        var dogName = document.createElement("span");
                        dogName.textContent = response.data.animals[i].name;
                        dogName.classList.add("fa", "fa-star");
                        singleAdoption.appendChild(dogName);

                        // span for breed
                        var dogBreed = document.createElement("span");
                        dogBreed.textContent = response.data.animals[i].breeds.primary;
                        singleAdoption.appendChild(dogBreed);

                        // span for location
                        var dogLocation = document.createElement("span");
                        dogLocation.textContent = response.data.animals[i].contact.address.city + ", " + response.data.animals[i].contact.address.state;
                        singleAdoption.appendChild(dogLocation);

                        // span for age
                        var dogAge = document.createElement("span");
                        dogAge.textContent = "Age: " + response.data.animals[i].age;
                        singleAdoption.appendChild(dogAge);

                        // span for size
                        var dogSize = document.createElement("span");
                        dogSize.textContent = "Size: " + response.data.animals[i].size;
                        singleAdoption.appendChild(dogSize);

                        // span for gender
                        var dogGender = document.createElement("span");
                        dogGender.textContent = "Gender: " + response.data.animals[i].gender;
                        singleAdoption.appendChild(dogGender);

                        // span for description
                        var dogDescription = document.createElement("span");
                        dogDescription.textContent = response.data.animals[i].description;
                        dogDescription.textContent.replace("&#039;", "'");
                        dogDescription.textContent.replace("&#39;", "'");
                        dogDescription.textContent.replace("&amp;#39;", "'");
                        dogDescription.textContent.replace("&amp;#34;", '"');
                        singleAdoption.appendChild(dogDescription);

                        // more info button
                        var moreInfo = document.createElement("a");
                        moreInfo.textContent = "Click here for more info!";
                        moreInfo.setAttribute("href", response.data.animals[i].url);
                        moreInfo.setAttribute("target", "_blank");
                        singleAdoption.appendChild(moreInfo);
                    }
                }
            
            // function to move clicked adoption box to favorite div
            var addFavorite = function(event) {
                var targetEl = event.target;
                var parentEl = targetEl.parentElement;

                if (targetEl.matches(".fa")) {
                    favoritesBox.appendChild(parentEl);
                }
                
                localStorage.setItem("favDog", favoritesBox.innerHTML);
            }

            adoptionBox.addEventListener("click", addFavorite);
        })
    }

var favoritesList = localStorage.getItem("favDog");
favoritesBox.innerHTML = favoritesList;

randomButton.addEventListener("click", randomDogs);
adoptionFetch();