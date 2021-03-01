import React, { useState, useEffect } from 'react';
import './PokemonApp.scss';

import PokemonForm from './components/PokemonForm';

function PokemonApp() {
  const [status, setStatus] = useState('idle');
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState(null);

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setStatus('pending');
    getPokemon(pokemonName);
  }, [pokemonName]);

  const getPokemon = (query) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((response) => response.json())
      .then((pokemonData) => {
        setStatus('resolved');
        setPokemon(pokemonData);
      });
  };

  const handleToUpdate = (pokemonName) => setPokemonName(pokemonName);

  return (
    <div className="PokemonApp">
      <PokemonForm handleToUpdate={handleToUpdate} />
      {status === 'resolved' && pokemon && <div>{pokemon.name}</div>}
    </div>
  );
}

export default PokemonApp;
