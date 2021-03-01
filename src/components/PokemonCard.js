import React from 'react';
import './PokemonCard.scss';

function PokemonCard({ id, name, sprites, types }) {
  return (
    <div className="PokemonCard">
      <img
        className="PokemonCard__Image"
        src={
          sprites.other.dream_world.front_default ||
          sprites.other['official-artwork'].front_default
        }
        alt={name}
      ></img>
      <div className="PokemonCard__Details">
        <span className="PokemonCard__Badge"># {id}</span>
        <h1 className="PokemonCard__Title">{name}</h1>
        <div className="PokemonCard__Info">
          {types.map((type, index) => {
            return <span key={index}>{type.type.name}</span>;
          })}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
