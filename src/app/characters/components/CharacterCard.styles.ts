import styled from 'styled-components';

/**
 * Styled Card component for displaying a character.
 *
 * The card features a dark background
 * and a scaling/box-shadow effect on hover.
 */
export const Card = styled.div`
  max-width: 15rem;
  cursor: pointer;
  color: #ffffffda;
  padding: 1.5rem;
  background-color: #202022;
  pointer-events: auto;
  transform: scale(1);
  opacity: 1;
  transition: all 150ms ease-in-out;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
`;

/**
 * Styled title for the character card.
 */
export const CardTitle = styled.h3`
  position: relative;
  margin-bottom: 0.5rem;
  text-align: center;
`;
