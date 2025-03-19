import styled from "styled-components";

/**
 * PaginationContainer styles the container holding pagination controls.
 */
const PaginationContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
`;

/**
 * PaginationButton styles the pagination buttons.
 *
 * @remarks
 * The button uses its default background color and switches on hover.
 */
const PaginationButton = styled.button`
  background-color: #C8102E;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #F4E300;
    color: #000;
  }
`;

/**
 * PageIndicator styles the text that shows the current page number.
 */
const PageIndicator = styled.span`
  color: #fff;
  font-weight: bold;
`;

export { PaginationContainer, PaginationButton, PageIndicator };
