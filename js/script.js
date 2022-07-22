var pokemonName = document.querySelector('#pokemon-name')
var pokemonNumber = document.querySelector('#pokemon-number')
var pokemonType = document.querySelector('#pokemon-type')
var pokemonImage = document.querySelector('#pokemon')
var form = document.querySelector('#form')
var input = document.querySelector('#pesquisa')
var buttonPrev = document.querySelector('.prev')
var buttonNext = document.querySelector('.next')

let searchPokemon = 1


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(APIResponse.status === 200 ){
        const data = await APIResponse.json()
        return data
    } 
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Carregando..."
    pokemonNumber.innerHTML = ''
    pokemonType.innerHTML = ''
    const data = await fetchPokemon(pokemon)

    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML= data.id
        pokemonType.innerHTML = data['types']['0']['type']['name']
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        searchPokemon = data.id
    }
    else{
        pokemonName.innerHTML = 'Não Encontrado :('
        pokemonNumber.innerHTML= ''
        pokemonType.innerHTML = ''
        pokemonImage.style.display = 'none'
        input.value = ''
    }
}

form.addEventListener('submit' , (e) =>{
    e.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click' , (e) =>{
    if(searchPokemon > 1){
        searchPokemon -= 1
    renderPokemon(searchPokemon)
    }
    
})

buttonNext.addEventListener('click' , (e) =>{
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)