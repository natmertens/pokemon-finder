//IIFE

let pokemonRepository = (function() {
  //pokemonList array
  let pokemonList = [];

  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    listItem.classList.add('list-group-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-warning');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemon-modal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
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
    return fetch(apiURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsURL: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  //load pokemon details
  function loadDetails(item) {
    let url = item.detailsURL;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageURL = details.sprites.front_default;
        item.height = details.height;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  //display modal with Bootstrap
  function showModal(pokemon) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = pokemon.name;

    let pokemonImage = document.createElement('img');
    pokemonImage.classList.add('modal-img');
    pokemonImage.setAttribute('src', pokemon.imageURL);

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'height: ' + pokemon.height;

    modalTitle.appendChild(pokemonName);
    modalBody.appendChild(pokemonImage);
    modalBody.appendChild(pokemonHeight);
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
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
