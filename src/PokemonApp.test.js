import { render, act, screen, fireEvent } from '@testing-library/react';
import { fetchPokemon } from './services/fetchPokemon';
import PokemonApp from './PokemonApp';

const pokemon = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokemonAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    },
  },
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
};

jest.mock('./services/fetchPokemon');

test('It renders a Pokémon', async () => {
  fetchPokemon.mockResolvedValue(pokemon);

  let getByText;

  await act(async () => {
    ({ getByText } = render(<PokemonApp />));
    const input = screen.getByLabelText('pokemon name');
    const submitButton = screen.getByText(/go/i);

    fireEvent.change(input, { target: { value: 'Bulbasaur' } });
    fireEvent.click(submitButton);
  });

  expect(getByText(pokemon.name)).toBeInTheDocument();
});
