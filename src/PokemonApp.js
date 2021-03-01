import React, { useState } from 'react';
import './PokemonApp.scss';

import PokemonForm from './components/PokemonForm';

function PokemonApp() {
  const [pokemonName, setPokemonName] = useState(null);

  const handleToUpdate = (pokemonName) => setPokemonName(pokemonName);

  return (
    <div className="PokemonApp">
      <PokemonForm handleToUpdate={handleToUpdate} />
      {pokemonName}
    </div>
  );
}

export default PokemonApp;
