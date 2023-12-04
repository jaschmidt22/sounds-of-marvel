var villainName = "";
//event listener for the form submission
document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    villainName = document.getElementById("villainname").value;

    storeUserInput(villainName);
    getMarvelVillain(villainName);
  });

// Function to store user input in localStorage
function storeUserInput(input) {
  const previousInputs = JSON.parse(localStorage.getItem("userInputs")) || [];
  previousInputs.push(input);

  if (previousInputs.length > 3) {
    previousInputs.shift(); //removes oldest search
  }

  localStorage.setItem("userInputs", JSON.stringify(previousInputs));

  // Call function to update the buttons with the last 3 searhces
  updateButtons(previousInputs);
}

// Function to update the buttons with the last 3 inputs
function updateButtons(inputs) {
  const buttonsContainer = document.getElementById("buttons-container");
  buttonsContainer.innerHTML = ""; // Clear existing buttons

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const button = document.createElement("button");
    button.textContent = input;
    button.addEventListener("click", function () {
      // When a button is clicked, set the input value and submit the form
      document.getElementById("villainname").value = input;
      document.getElementById("search-form").submit();
    });
    buttonsContainer.appendChild(button);
  }
}

// Function to display the last 3 inputs initially
function displayLast3Inputs(inputs) {
  const inputsContainer = document.getElementById("last-inputs");
  inputsContainer.innerHTML = ""; // Clear existing list

  for (let i = inputs.length - 1; i >= 0; i--) {
    const input = inputs[i];
    const liEl = document.createElement("li");
    liEl.textContent = input;
    inputsContainer.appendChild(liEl);
  }
}

// Call the displayLast3Inputs function initially to display existing inputs
const previousInputs = JSON.parse(localStorage.getItem("userInputs")) || [];
displayLast3Inputs(previousInputs);

// Call the updateButtons function initially to populate buttons
updateButtons(previousInputs);

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

      displayCharacter(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function displayCharacter(data) {
  const imgEl = document.createElement("img");
  imgEl.src = data.data.results[0].thumbnail.path + ".jpg";
  const h2El = document.createElement("h2");
  h2El.textContent = data.data.results[0].name;
  const comicList = data.data.results[0].comics.items;

  // Create an unordered list to hold the comics
  const ulEl = document.createElement("ul");

  // Iterate through the comics and create list items for each one
  for (let i = 0; i < comicList.length; i++) {
    const comicItem = comicList[i];
    const liEl = document.createElement("li");
    liEl.textContent = comicItem.name;
    ulEl.appendChild(liEl);
  }

  // Append the elements to the DOM
  document.body.appendChild(imgEl);
  document.body.appendChild(h2El);
  document.body.appendChild(ulEl);
}
