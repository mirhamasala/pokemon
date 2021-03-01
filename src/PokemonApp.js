import React, { useState, useEffect } from 'react';
import logo from './svgs/logo.svg';
import chevronLeft from './svgs/chevron_left.svg';
import chevronRight from './svgs/chevron_right.svg';
import pokeball from './svgs/pokeball.svg';
import './PokemonApp.scss';

import { fetchPokemon } from './services/fetchPokemon';
import PokemonCard from './components/PokemonCard';
import PokemonForm from './components/PokemonForm';

function PokemonApp() {
  const totalPokemon = 898;

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(null);
  const [pokemonName, setPokemonName] = useState(null);

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setStatus('pending');
    getPokemon(pokemonName);
  }, [pokemonName]);

  useEffect(() => {
    if (!pokemonId) {
      return;
    }
    getPokemon(pokemonId);
  }, [pokemonId]);

  const getPokemon = (query) => {
    fetchPokemon(query).then((res) => {
      if (!res.status) {
        setStatus('resolved');
        setPokemon(res);
        return;
      }
      if (res.status === 404) {
        setStatus('rejected');
        setError(`Pokémon doesn't exist.`);
        return Promise.reject(res.status);
      } else {
        setStatus('rejected');
        setError(`Oops. Try again later.`);
        return Promise.reject(res.status);
      }
    });
  };

  const getPrevPokemon = () => setPokemonId(pokemon.id - 1);
  const getNextPokemon = () => setPokemonId(pokemon.id + 1);

  const getRandomPokemon = () =>
    setPokemonId(Math.floor(Math.random() * totalPokemon + 1));

  const handleToUpdate = (pokemonName) => setPokemonName(pokemonName);

  return (
    <div className="PokemonApp">
      <div className="PokemonApp__Wrapper">
        <PokemonForm handleToUpdate={handleToUpdate} />
        {status !== 'resolved' && (
          <div
            className={`PokemonApp__BlankCard ${
              status === 'rejected' ? 'PokemonApp__BlankCard--Error' : ''
            }`}
          >
            {status === 'pending' && <span>Searching...</span>}
            {status === 'rejected' && <span>{error}</span>}
            <img src={logo} className="PokemonApp__Logo" alt="logo" />
          </div>
        )}
        {status === 'resolved' && pokemon && (
          <div className="PokemonApp__CardWrapper">
            <PokemonCard {...pokemon} />
            {pokemon.id > 1 && (
              <button
                className="PokemonApp__Button PokemonApp__Button--prev"
                onClick={getPrevPokemon}
              >
                <img src={chevronLeft} alt="Previous" />
              </button>
            )}
            {pokemon.id < totalPokemon && (
              <button
                className="PokemonApp__Button PokemonApp__Button--next"
                onClick={getNextPokemon}
              >
                <img src={chevronRight} alt="Next" />
              </button>
            )}
          </div>
        )}
        <button
          className="PokemonApp__Button PokemonApp__Button--random"
          onClick={getRandomPokemon}
        >
          <img src={pokeball} alt="Random pokémon" />
        </button>
      </div>
    </div>
  );
}

export default PokemonApp;
