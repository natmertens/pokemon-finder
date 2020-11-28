//IIFE

let pokemonRepository = (function() {

  //pokemonList array
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass', 'poison']
    },

    {
      name: 'Ivysaur',
      height: 1,
      types: ['grass', 'poison']
    },

    {
      name: 'Venusaur',
      height: 2,
      types: ['grass', 'poison']
    }

  ];

  //adds pokemon to pokemonList
  function add(item) {
    pokemonList.push(item);
  }

  //returns pokemonList
  function getAll() {
    return pokemonList;
  }

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

  //displays pokemon names in the console
  function showDetails(pokemon) {
    console.log(pokemon.name)
  }

  //object to access functions outside IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };

})();

// end IIFE

// forEach loop to display buttons with names of all pokemons

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)
})
//end forEach
