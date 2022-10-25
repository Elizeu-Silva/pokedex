import '../css/style.css'

const pokeName = document.querySelector('.pokeName');
const pokeId = document.querySelector('.pokeId');
const pokeImg = document.querySelector('.img-pokemon');
const form = document.querySelector('form');
const input = document.querySelector('.search');
const btn_prev = document.querySelector('.btn-prev');
const btn_next = document.querySelector('.btn-next');

let pokeButton = 1;


const fetchPokemon = async (pokemon) =>{
  
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data
  }
}

const renderPokemon = async (pokemon) =>{
  
  pokeName.innerHTML = 'Carregando...';
  pokeId.innerHTML = ''

  const data = await fetchPokemon(pokemon);

  if(data){
    pokeName.innerHTML = data.name;
    pokeId.innerHTML = data.id;
    pokeImg.style.display = 'block'
    pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = ''
    pokeButton = data.id;
    
  }else {
    pokeImg.style.display = 'none'
    pokeName.innerHTML = 'Não encontrado :c'
    pokeId.innerHTML = ''
    input.value = ''
  }


};

renderPokemon(pokeButton)

form.addEventListener('submit', (event) =>{
  event.preventDefault();

  renderPokemon(input.value)

})

btn_next.addEventListener('click', (event) =>{

  pokeButton += 1;
  renderPokemon(pokeButton)

})

btn_prev.addEventListener('click', (event) =>{

  if(pokeButton > 1){
    pokeButton -= 1;
    renderPokemon(pokeButton)    
  }


})

