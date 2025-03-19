import React from 'react';
import { render, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import CharacterModal from '@/app/characters/components/CharacterModal';
import { Character } from '@/types/character';

expect.extend(toHaveNoViolations);

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

describe('Accessibility tests for CharacterModal', () => {
  it('should have no accessibility violations', async () => {
    let container: HTMLElement;
    await act(async () => {
      const rendered = render(<CharacterModal character={characterMock} onClose={() => {}} />);
      container = rendered.container;
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    const results = await axe(container!);
    expect(results).toHaveNoViolations();
  });
});

afterEach(() => {
  jest.clearAllTimers();
});