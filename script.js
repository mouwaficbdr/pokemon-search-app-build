const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const pokemonName = document.getElementById('pokemon-name')
const pokemonId = document.getElementById('pokemon-id')
const weight = document.getElementById('weight')
const height = document.getElementById('height')
const pokemonImg = document.getElementById('pokemon-img')
const types = document.getElementById('types')
const sprite = document.getElementById('sprite')
const hp = document.getElementById('hp')
const attack = document.getElementById('attack')
const defense = document.getElementById('defense')
const specialAttack = document.getElementById('special-attack')
const specialDefense = document.getElementById('special-defense')
const speed = document.getElementById('speed')

const pokemonsAPI  = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon'

let pokemonsList = []; 
let selectedPokemon = {}
let selectedPokemonInfos = {}

const fetchData = async (enteredPokemon) => {
  try {
    const res = await fetch(pokemonsAPI)
    const data = await res.json()
    pokemonsList = getPokemons(data);
    selectedPokemon = getSelectedPokemon(pokemonsList, enteredPokemon)
    selectedPokemonInfos = await getSelectedPokemonInfos(selectedPokemon)
  } catch (error) {
    console.log(error)
  }
}

searchButton.addEventListener("click", async () => {
  const enteredPokemon = searchInput.value.toLowerCase()
  await fetchData(enteredPokemon)
  if (pokemonsList.some(pokemon => pokemon.name === enteredPokemon || pokemon.id == enteredPokemon)) {
    displaySelectedPokemon(selectedPokemonInfos)
  } else {
    alert("Pokémon not found")
  }
})

const getPokemons = (data) => {
  const { results } = data
  return results
}

const getSelectedPokemon = (pokemonsList, enteredPokemon) => {
  let selectedPokemon = {}
  pokemonsList.forEach(pokemon => {
    if(pokemon.name === enteredPokemon || pokemon.id == enteredPokemon) {
      selectedPokemon = {...pokemon}
    }
  })
  return selectedPokemon
}

const getSelectedPokemonInfos = async (selectedPokemon) => {
  const res = await fetch(selectedPokemon.url)
  const data = await res.json()
  return data
}

const displaySelectedPokemon = (selectedPokemonInfos) => {
  const { id, name, weight: pokemonWeight, height: pokemonHeight, sprites, types: pokemonTypes, stats } = selectedPokemonInfos
  pokemonId.textContent = `#${id}`
  pokemonName.textContent = `${name.charAt(0).toUpperCase() + name.slice(1)}`
  weight.textContent = `Weight: ${pokemonWeight}`
  height.textContent = `Height: ${pokemonHeight}`
  pokemonImg.innerHTML = `<img src="${sprites.front_default}" alt="${name}" id="sprite">`
  types.innerHTML = pokemonTypes.map(type => `<div class="types ${type.type.name}">${(type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1))}</div>`).join('')
  stats.forEach((stat) => {
    document.getElementById(stat.stat.name).textContent = stat.base_stat;
  })
}