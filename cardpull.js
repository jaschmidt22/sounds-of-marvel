function createCard() {
        // Get the search bar value
        var searchBarValue = document.getElementById('searchBar').value;

        // Create a div container
        var container = document.createElement('div');
        container.className = 'card';

        // Create a div card inside the container
        var card = document.createElement('div');
        card.textContent = searchBarValue;

        // Append the card to the container
        container.appendChild(card);

        // Append the container to the card container in the HTML
        document.getElementById('cardContainer').appendChild(container);
}