"use client";
import React, { ReactNode } from 'react';
import { ModalContainer, ModalContent, CloseButton } from './Modal.styles';

/**
 * Props for ModalBase component.
 *
 * @property {ReactNode} children - The content to display inside the modal.
 * @property {() => void} onClose - Callback function to close the modal.
 */
interface ModalBaseProps {
  children: ReactNode;
  onClose: () => void;
}

/**
 * ModalBase component.
 *
 * This component renders a modal overlay. Clicking outside the modal content triggers
 * the onClose callback, while clicks inside the modal content are prevented from propagating.
 *
 * @param children - The modal content.
 * @param onClose - Function to call when the modal should close.
 * @returns The modal UI.
 */
export default function ModalBase({ children, onClose }: ModalBaseProps) {
  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close modal">&times;</CloseButton>
        {children}
      </ModalContent>
    </ModalContainer>
  );
}
