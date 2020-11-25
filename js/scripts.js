//pokemonList variable

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

//pokemonList variable ends here

// forEach loop to display names and heights for all listed pokemons
pokemonList.forEach(function(pokemon) {
  if (pokemon.height > 1.5)
  //Text to highlight pokemons larger than 1.5
    {document.write(`<p>${pokemon.name} (height: ${pokemon.height}) – wow, that's big!</p>`);}
  //Text for pokemons not larger than 1.5
  else {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})</p>`);}
});
//forEach loop ends here
