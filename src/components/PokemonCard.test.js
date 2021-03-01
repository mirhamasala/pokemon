import { render } from '@testing-library/react';
import PokemonCard from './PokemonCard';

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

const setup = () => {
  const utils = render(<PokemonCard {...pokemon} />);
  const id = utils.getByText(/1/);
  const name = utils.getByText(/bulbasaur/i);
  const type = utils.getByText(/grass/);
  const type2 = utils.getByText(/poison/);
  const image = utils.getByRole('img');

  return {
    id,
    name,
    type,
    type2,
    image,
    ...utils,
  };
};

test('It renders id', () => {
  const { id } = setup();
  expect(id).toBeInTheDocument();
});

test('It renders name', () => {
  const { name } = setup();
  expect(name).toBeInTheDocument();
});

test('It renders types', () => {
  const { type, type2 } = setup();
  expect(type).toBeInTheDocument();
  expect(type2).toBeInTheDocument();
});

test('It renders image', () => {
  const { image } = setup();
  expect(image).toHaveAttribute(
    'src',
    'https://raw.githubusercontent.com/PokemonAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
  );
});
