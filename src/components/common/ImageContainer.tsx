import styled, { keyframes } from "styled-components";

// Define keyframes for a spinning animation
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

/**
 * ImageContainer component.
 *
 * A styled container for images with fixed dimensions, rounded corners,
 * and flexbox centering to ensure children (such as a spinner) are centered.
 */
export const ImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Spinner component.
 *
 * A styled spinner that rotates continuously, used to indicate loading state.
 */
export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #F4E300;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
