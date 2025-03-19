import styled from "styled-components";

/**
 * TopBar styles the container that holds the search bar and filter controls.
 */
export const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 3rem;
  padding: 0 20px;
`;

/**
 * SearchBarContainer provides flexible sizing for the search bar.
 */
export const SearchBarContainer = styled.div`
  flex: 1;
  min-width: 250px;
`;

/**
 * FiltersContainer styles the container for filter dropdowns.
 */
export const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

/**
 * FilterGroup styles an individual filter group, including its label and select element.
 */
export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: #fff;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  select {
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    background-color: #202022;
    color: #fff;
    font-size: 0.9rem;
  }
`;
