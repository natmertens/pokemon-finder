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


  let modalContainer = document.querySelector('#modal-container')


// display modal
  function showModal(pokemon) {

    modalContainer.innerHTML = '';

    modalContainer.classList.add('is-visible');

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let button = document.createElement('button');
    button.classList.add('modal-close');
    button.innerText = 'X';
    button.addEventListener('click', hideModal);

    let pokemonShowName = document.createElement('p');
    pokemonShowName.innerText = `name: ${pokemon.name}`;

    let pokemonShowHeight = document.createElement('p');
    pokemonShowHeight.innerText = `height: ${pokemon.height}`;

    let pokemonShowImage = document.createElement('img');
    pokemonShowImage.src = pokemon.imageURL;

    modal.appendChild(button);
    modal.appendChild(pokemonShowName);
    modal.appendChild(pokemonShowHeight);
    modal.appendChild(pokemonShowImage);
    modalContainer.appendChild(modal);
  }

//hide modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  //hide modal via Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

//hide modal in case of click outside of modal
  modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

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
