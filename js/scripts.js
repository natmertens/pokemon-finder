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

// for loop to display names and heights for all listed pokemons
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.5)
  //Text to highlight pokemons larger than 1.5
    {document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}) – wow, that's big!</p>`);}
  else {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height})</p>`);}
}
//for loop ends here
