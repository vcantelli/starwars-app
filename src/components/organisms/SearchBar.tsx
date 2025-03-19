"use client";
import { ChangeEvent } from "react";
import styled from "styled-components";

/**
 * StyledInput is a styled input field used for searching characters.
 */
const StyledInput = styled.input`
  background-color: #202022;
  color: #fff;
  border: 1px solid #3b3b3b;
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
  font-size: 1rem;

  ::placeholder {
    color: #aaa;
  }
`;

/**
 * Props for the SearchBar component.
 *
 * @property {string} value - The current search value.
 * @property {(e: ChangeEvent<HTMLInputElement>) => void} onChange - Handler for input changes.
 */
interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * SearchBar component.
 *
 * Renders a styled input for searching characters.
 *
 * @param value - The search input value.
 * @param onChange - The function to handle input changes.
 * @returns A styled input component.
 */
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <StyledInput
      type="text"
      placeholder="Search characters..."
      value={value}
      onChange={onChange}
    />
  );
}
