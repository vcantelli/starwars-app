"use client";
import styled, { keyframes } from "styled-components";

/**
 * Keyframes for the spinner animation.
 */
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

/**
 * LoaderContainer covers the entire viewport with a dark background,
 * ensuring the loading spinner is displayed on top of all other elements.
 */
const LoaderContainer = styled.div`
  position: fixed; /* Fixed position to cover entire viewport */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* High z-index to overlay all content */
`;

/**
 * Spinner is a styled component that shows a spinning animation,
 * used as a visual indicator for loading states.
 */
const Spinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.2);
  border-top: 8px solid #F4E300;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

/**
 * Loading component.
 *
 * Displays a full-screen loader while the application or data is loading.
 *
 * @returns The loading spinner overlay.
 */
export default function Loading() {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
}
