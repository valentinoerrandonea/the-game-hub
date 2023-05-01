const randomNumber = () => Math.floor(Math.random() * 21);

const discoverPokemon =
  document.getElementById('discoverPokemon');



const showPokeAlert = async () => {
  const resp = await fetch('https://pokeapi.co/api/v2/pokemon')
  const data = await resp.json()
  const pokemon = (data.results[randomNumber()])
  const pokemonName = pokemon.name


  const getUrl = pokemon.url


  const getImage = await fetch(getUrl)
  const urlData = await getImage.json()
  const sprites = (urlData.sprites)
  const urlImage = (sprites.front_default)


  console.log(pokemonName)
  discoverPokemon.addEventListener('click', () => {
    Swal.fire({
      imageUrl: urlImage,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: `${pokemon.name} image`,
      title: `${pokemon.name.toUpperCase()}`,
      confirmButtonText: `Meet our dear friend, ${pokemonName.toUpperCase()}!`,
      background: '#212121',
      color: '#FF4545',
      confirmButtonColor: '#FF4545',
    })
      .then(() => {
        window.open(`https://pokemon.fandom.com/wiki/${pokemonName}`)
      })



  })
}

showPokeAlert()


const getPokemonImage = async () => {
  const resp = await fetch('https://pokeapi.co/api/v2/pokemon');
  const data = await resp.json();
  const pokemon = data.results[randomNumber()];
  const pokemonName = pokemon.name;

  const getUrl = pokemon.url;

  const getImage = await fetch(getUrl);
  const urlData = await getImage.json();
  const sprites = urlData.sprites;
  const urlImage = sprites.front_default;


  pokemonImage = new Image();
  pokemonImage.src = urlImage;
  pokemonImage.onload = startGame;
};
