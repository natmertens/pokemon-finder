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
    let pokemonList = $('.pokemon-list');
    let listItem = $('<li></li>');
    listItem.addClass('list-group-item');
    let button = $('<button>' + pokemon.name + '</button>');
    button.addClass('btn');
    button.addClass('btn-warning');
    button.attr('data-toggle', 'modal')
    button.attr('data-target', '#pokemon-modal')
    listItem.append(button);
    pokemonList.append(listItem);
    button.on('click', function(event) {
      showDetails(pokemon)
    });
  }

  //display pokemon details in the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

//get list of pokemon from external API and push each one to pokemonList
  function loadList() {
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



  //display modal with Bootstrap
    function showModal(pokemon) {

      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');

      modalTitle.empty();
      modalBody.empty();

      let pokemonShowName = $('<h1>' + pokemon.name + '</h1>');

      let pokemonShowImage = $('<img class="modal-img" style="width:30%">');

      pokemonShowImage.attr('src', pokemon.imageURL);

      let pokemonShowHeight = $('<p>' + 'height: ' + pokemon.height + '</p>');

      modalTitle.append(pokemonShowName);
      modalBody.append(pokemonShowImage);
      modalBody.append(pokemonShowHeight);

    }


  //object to access functions outside IIFE
  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList
  };

})();

// end IIFE

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
