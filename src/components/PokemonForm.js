import React from 'react';

function PokemonForm() {
  return (
    <form className="PokemonForm">
      <input
        aria-label="pokemon name"
        id="pokemonName"
        placeholder="Enter Pokémon"
        type="text"
        className="PokemonForm__Input"
      ></input>
      <button type="submit" className="PokemonForm__Button">
        Go
      </button>
    </form>
  );
}

export default PokemonForm;
