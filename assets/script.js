//Your public key
//eab1d19bc677c5895ed2a42f467f7f61
//Your private key
//43d9c6dd89291a0fbce0aa0cb1115580f6f7dd0b

fetch('https://gateway.marvel.com:443/v1/public/characters?apikey=eab1d19bc677c5895ed2a42f467f7f61')
  
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Process and use the data here
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });