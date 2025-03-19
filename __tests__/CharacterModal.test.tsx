import React from 'react';
import { render, screen, act } from '@testing-library/react';
import CharacterModal from '@/app/characters/components/CharacterModal';
import { Character } from '@/types/character';

jest.mock('@/services/databank', () => ({
  getCharacterFromDatabank: jest.fn().mockResolvedValue({
    _id: '1',
    name: 'Luke Skywalker',
    description: 'Jedi Master',
    image: '/luke-skywalker.jpg',
    __v: 0,
  }),
}));

jest.mock('@/services/swapi', () => ({
  getHomeworld: jest.fn().mockResolvedValue({
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    residents: [],
    films: [],
    created: '2014-12-09T13:50:49.641Z',
    edited: '2014-12-15T13:48:16.167Z',
    url: 'https://swapi.dev/api/planets/1/',
  }),
}));

jest.mock('@/components/common/ModalBase', () => {
  const MockModalBase = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => (
    <div data-testid="modal" onClick={onClose}>
      {children}
    </div>
  );
  MockModalBase.displayName = 'ModalBase';
  return MockModalBase;
});

const characterMock: Character = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  gender: 'male',
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

describe('CharacterModal', () => {
  it('renders modal with character details and homeworld info', async () => {
    await act(async () => {
      render(<CharacterModal character={characterMock} onClose={() => {}} />);
    });

    expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();

    expect(await screen.findByText(/Tatooine/i)).toBeInTheDocument();

    expect(await screen.findByAltText('Luke Skywalker')).toBeInTheDocument();
  });
});