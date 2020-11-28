/*
pokemonRepository variable that holds pokemonList variable and returns an object with the following functions assigned as keys:
getAll: return all items
add: add a single item to the pokemonList array
*/

let pokemonRepository = (function() {

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

  function add(item) {
    pokemonList.push(item);
  }

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
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

})();

//pokemonRepository variable ends here

// forEach loop to display names and heights for all listed pokemons

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)
})
//forEach loop ends here
