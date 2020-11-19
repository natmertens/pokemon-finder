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

for (let i = 0; i < pokemonList.length; i++)
{document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');}
