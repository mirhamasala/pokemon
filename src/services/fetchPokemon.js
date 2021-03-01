export function fetchPokemon(query) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${query}`).then((res) =>
    res.ok ? res.json() : res
  );
}
