import React, { useState, useEffect } from 'react';
import './PokemonApp.scss';

import PokemonCard from './components/PokemonCard';
import PokemonForm from './components/PokemonForm';

function PokemonApp() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          setStatus('rejected');
          setError(`Pokémon doesn't exist.`);
          return Promise.reject(response.status);
        } else {
          setStatus('rejected');
          setError(`Oops. Try again later.`);
          return Promise.reject(response.status);
        }
      })
      .then((pokemonData) => {
        setStatus('resolved');
        setPokemon(pokemonData);
      });
  };

  const handleToUpdate = (pokemonName) => setPokemonName(pokemonName);

  return (
    <div className="PokemonApp">
      <div className="PokemonApp__Wrapper">
        <PokemonForm handleToUpdate={handleToUpdate} />
        {status !== 'resolved' && (
          <div>
            {status === 'pending' && <span>Searching...</span>}
            {status === 'rejected' && <span>{error}</span>}
          </div>
        )}
        {status === 'resolved' && pokemon && (
          <div className="PokemonApp__CardWrapper">
            <PokemonCard {...pokemon} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonApp;
