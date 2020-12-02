//IIFE

let pokemonRepository = (function() {

  //pokemonList array
  let pokemonList = [];

  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

  //add pokemon to pokemonList
  function add(item) {
    pokemonList.push(item);
  }

  //return pokemonList
  function getAll() {
    return pokemonList;
  }

//display pokemon buttons with event listeners on the page
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(event) {
      showDetails(pokemon)
    });
  }

  //display pokemon details in the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

//get list of pokemon from external API and push each one to pokemonList
  function loadList () {
    return fetch(apiURL).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsURL: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error (e);
    });
  }

//load pokemon details
  function loadDetails(item) {
    let url = item.detailsURL;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageURL = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }

  //object to access functions outside IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();

// end IIFE

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
