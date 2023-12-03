var villainName = "";
//event listener for the form submission
document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    villainName = document.getElementById("villainname").value;

    getMarvelVillain(villainName);
  });

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
