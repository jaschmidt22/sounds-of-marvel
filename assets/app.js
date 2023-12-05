const API_KEY = "AIzaSyDKXRd5Yj3jU8uJJxJ9qO9JYOIlvYojXjw";

var url = "";
var villainName;

function handleFormSubmit(event) {
  event.preventDefault();
  var inputElement = document.getElementById("searchInput");
  villainName = inputElement.value;
  var q = inputElement.value + "trailer";
  url =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" +
    q +
    "&key=" +
    API_KEY;
  searchYouTube();
  getMarvelVillain(villainName);
  storeUserInput(villainName);
}

handleFormSubmit();

// Function to store user input in localStorage
function storeUserInput(villainName) {
  const previousInputs = JSON.parse(localStorage.getItem("userInputs")) || [];
  previousInputs.push(villainName);

  if (previousInputs.length > 3) {
    previousInputs.shift(); //removes oldest search
  }

  localStorage.setItem("userInputs", JSON.stringify(previousInputs));

  // Call function to update the buttons with the last 3 searhces
  //console.log(previousInputs);
  displayLast3Inputs(previousInputs);
}

function searchYouTube() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.items[0].id.videoId);
      vidID = data.items[0].id.videoId;
      vidURL = "https://www.youtube.com/embed/" + vidID + "?autoplay=1&mute=1";
      if (charName) {
        createCard();
      } else {
        console.log(
          "No character name available. Skipping createCard in searchYouTube."
        );
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function getMarvelVillain(villainName) {
  var queryURL = `https://gateway.marvel.com/v1/public/characters?&name=${villainName}&apikey=eab1d19bc677c5895ed2a42f467f7f61`;

  fetch(queryURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.data.results.length !== 0) {
        comicsulDiv = document.createElement("ul");
        comicsliDiv = document.createElement("li");
        charName = data.data.results[0].name;
        charImg = data.data.results[0].thumbnail.path + ".jpg";
        charComics = data.data.results[0].comics.items;
        for (let i = 0; i < charComics.length; i++) {
          const comicItem = charComics[i];
          const liEl = document.createElement("li");
          liEl.textContent = comicItem.name;
          comicsulDiv.appendChild(liEl);
        }
        createCard();
      } else {
        console.log("Can not find character");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function createCard() {
  // Check if charName is defined before creating the card
  if (!charName) {
    console.log("No character name available. Skipping createCard.");
    return;
  }

  // Create a new card element
  const card = document.createElement("div");
  card.className = "card";
  const imgDiv = document.createElement("img");
  imgDiv.src = charImg;
  const nameDiv = document.createElement("h1");
  nameDiv.textContent = charName;
  const videoDiv = document.createElement("iframe");
  videoDiv.src = vidURL;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Card";
  deleteButton.addEventListener("click", () => deleteCard(card));
  const cardContainer = document.getElementById("cardContainer");
  card.appendChild(deleteButton);
  card.appendChild(imgDiv);
  card.appendChild(nameDiv);
  comicsulDiv.appendChild(comicsliDiv);
  card.appendChild(comicsulDiv);
  card.appendChild(videoDiv);
  cardContainer.appendChild(card);
}

// Function to display the last 3 inputs initially
function displayLast3Inputs(previousInputs) {
  const inputsContainer = document.getElementById("last-inputs");
  inputsContainer.innerHTML = ""; // Clear existing list
  console.log(previousInputs);

  for (let i = 0; i < previousInputs.length; i++) {
    const input = previousInputs[i];
    const liEl = document.createElement("li");
    liEl.textContent = input;
    inputsContainer.appendChild(liEl);
    console.log(input);
  }
}
function deleteCard(card) {
  // Remove the card from the DOM
  card.remove();
}

// Other Functions
// card function that pulls from local storage and generates a card
// Create a function that callsback on the functions for YT and Marvel when handle form sumbit
// Create a if statement to check if marvel character name = null
