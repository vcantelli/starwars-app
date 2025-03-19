import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterCard from '@/app/characters/components/CharacterCard';
import { Character } from '@/types/character';

const characterMock: Character = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  gender: 'Male',
  birth_year: '19BBY',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: ['https://swapi.dev/api/films/1/'],
  url: 'https://swapi.dev/api/people/1/',
  eye_color: 'blue',
  hair_color: 'blond',
  skin_color: 'fair',
  created: '2014-12-09T13:50:51.644Z',
  edited: '2014-12-10T13:52:43.172Z',
  species: [],
  starships: [],
  vehicles: [],
};

describe('CharacterCard', () => {
  it('should render the character name', () => {
    render(<CharacterCard character={characterMock} />);
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  });
});