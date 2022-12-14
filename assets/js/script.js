var randomButton = document.querySelector("#random-button");
var dogBox = document.querySelector("#dog-box");
var adoptionBox = document.querySelector("#adoption-info");
var favoritesBox = document.querySelector("#favorites");
var favoritesAndAdoption = document.querySelector("#adoption-info-container")

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
                for (i = 0; i < 7; i++) {
                    // skips if cat
                    if (response.data.animals[i].species !== "Dog" ) {
                        continue;
                    } else {
                        // creates div to put each entry into
                        var singleAdoption = document.createElement("div");
                        singleAdoption.classList.add("flex", "flex-col", "copy", "doggies");
                        adoptionBox.appendChild(singleAdoption);

                        // creates span for dog name
                        var dogName = document.createElement("span");
                        dogName.textContent = response.data.animals[i].name;
                        dogName.classList.add("fa", "fa-star", "hover-color", "dog-name","text-3xl");
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
                        if (response.data.animals[i].description) {
                            dogDescription.textContent = response.data.animals[i].description.replace("&#039;", "'").replace("&amp;#39;", "'").replace("&amp;#39;", "'").replace("&amp;#34;", '"').replace("&quot;", '"').replace("&amp;", "&");
                        }
                            singleAdoption.appendChild(dogDescription);

                        // more info button
                        var moreInfo = document.createElement("a");
                        moreInfo.textContent = "Click here for more info!";
                        moreInfo.setAttribute("href", response.data.animals[i].url);
                        moreInfo.setAttribute("target", "_blank");
                        moreInfo.classList.add("hover-color")
                        singleAdoption.appendChild(moreInfo);
                    }
                }
        })
    }

// function to move clicked adoption box to favorite div
var addFavorite = function(event) {
    var targetEl = event.target;
    var parentEl = targetEl.parentElement;

    if (targetEl.matches(".dog-name")) {
        favoritesBox.appendChild(parentEl);
        targetEl.classList.remove("dog-name");

        // add remove favorite button
        var remove = document.createElement("button");
        remove.textContent = "Click here to remove this entry";
        remove.className = "delete";
        remove.classList.add("hover-color")
        parentEl.appendChild(remove);
    }
    
    // removes favorite if delete class is clicked
    if (targetEl.matches(".delete")) {
        parentEl.remove();
    }

    // saves clicked div into localstorage
    localStorage.setItem("favDog", favoritesBox.innerHTML);
}

// event listener for favorites/adoptions
favoritesAndAdoption.addEventListener("click", addFavorite);

// loads local storage into favorites
var favoritesList = localStorage.getItem("favDog");
favoritesBox.innerHTML = favoritesList;
favoritesBox.classList.add("p-6", "bg-green-400", 'container', "flex", "flex-col", "m-12", "rounded-md")

// event listener for random dogs
randomButton.addEventListener("click", randomDogs);

// button which calls adoption fetch again
var callAgain = document.createElement("button");
callAgain.textContent = "Click here to check for more results!";
callAgain.classList.add("text-white", "hover-color")
adoptionBox.appendChild(callAgain);


var callFetch = function() {
    adoptionFetch();
}

callAgain.addEventListener("click", callFetch)

adoptionFetch();