import styled from 'styled-components';

/**
 * ModalContainer component.
 *
 * A styled container that covers the entire viewport with a semi-transparent dark overlay.
 * Ensures the modal content is centered.
 */
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

/**
 * ModalContent component.
 *
 * A styled container for modal content. It features a dark background,
 * rounded corners, and a scrollable area if content overflows.
 */
export const ModalContent = styled.div`
  position: relative;
  background: #202022;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  color: #ffffffda;
  overflow-y: auto;
  max-height: 90vh;
`;

/**
 * CloseButton component.
 *
 * A styled button positioned at the top right corner of the modal,
 * used to close the modal.
 */
export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: #ffffffda;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #F4E300;
  }
`;
