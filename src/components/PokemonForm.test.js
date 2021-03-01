import { render } from '@testing-library/react';
import PokemonForm from './PokemonForm';

const setup = () => {
  const utils = render(<PokemonForm />);
  const input = utils.getByLabelText('pokemon name');
  const submit = utils.getByText(/go/i);

  return {
    input,
    submit,
    ...utils,
  };
};

test('It renders submit button', () => {
  const { submit } = setup();
  expect(submit).toBeInTheDocument();
});

test('It renders input', () => {
  const { input } = setup();
  expect(input).toBeInTheDocument();
});
