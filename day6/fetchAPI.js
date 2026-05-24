const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const api = "https://api.themoviedb.org/3";
fetch(api)
  // .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
