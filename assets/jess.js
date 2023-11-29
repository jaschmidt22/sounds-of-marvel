var info;

var villainName = "";
//event listener for the form submission
document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault(); 
    villainName = document.getElementById("villainname").value;
    
   getMarvelVillain(villainName);
})

//https://gateway.marvel.com/v1/public/characters?name=loki&apikey=eab1d19bc677c5895ed2a42f467f7f61


function getMarvelVillain(villainName) {
var queryURL = `https://gateway.marvel.com/v1/public/characters?&name=${villainName}&apikey=eab1d19bc677c5895ed2a42f467f7f61`;  

fetch(queryURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        info = {name: data.data.results[0].name,comics:data.data.results[0].comics.items[0].name}; 
        console.log(data);
        var comicL = data.data.results[0].comics.items
            for (let i = 0; i < comicL.length; i++) {
                console.log(data.data.results[0].comics.items[i].name);
                
            }
        // console.log(data.results.series.items.name)
        //  console.log(data.results.comics.items.name)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    
    
console.log(info);
}



//villainInfo();
