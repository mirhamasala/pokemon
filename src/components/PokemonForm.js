import React from 'react';
import './PokemonForm.scss';

function PokemonForm({ handleToUpdate }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleToUpdate(event.target.elements.pokemonName.value.toLowerCase());
    event.target.elements.pokemonName.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="PokemonForm">
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
