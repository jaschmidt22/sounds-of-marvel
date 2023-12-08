// listen for the character name submit
// get character data from marvel
// get videos from youtube
// save previous search to localstorage

const $form = document.querySelector("form");
const $charInput = document.querySelector("#character-name");
$form.addEventListener("submit", function (e) {
  e.preventDefault();
  const character = $charInput.value;

  Promise.all([getMarvelVillain(character), getYoutubeVideo(character)]).then(
    (results) => {
      console.log(results);
      createCharCard(results[0].data.results[0]);
      createYoutubePreview(results[1].items[0].id.videoId);
    }
  );
});

function getMarvelVillain(villainName) {
  var queryURL = `https://gateway.marvel.com/v1/public/characters?&name=${villainName}&apikey=919c549402a753db3d66f1a8b1a0ca71`;

  return fetch(queryURL).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

function getYoutubeVideo(char) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${char} trailer&key=AIzaSyDKXRd5Yj3jU8uJJxJ9qO9JYOIlvYojXjw`;

  return fetch(url).then((res) => res.json());
}

// Create Character Card
function createCharCard(char) {
  console.log(char);
  const $charContainer = document.createElement("div");
  const $charName = document.createElement("h3");
  $charName.textContent = char.name;

  const $charDesc = document.createElement("p");
  $charDesc.textContent = char.description;

  $charContainer.append($charName);
  $charContainer.append($charDesc);

  document.body.append($charContainer);
}

function createYoutubePreview(id) {
  const $iframe = document.createElement("iframe");

  $iframe.src = `https://www.youtube.com/embed/${id}`;
  $iframe.width = 420;
  $iframe.height = 315;

  document.body.append($iframe);
}
// HTML content
// list of comics
// img
// name
// youtube video
