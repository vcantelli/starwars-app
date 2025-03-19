"use client";
import React, { Component, ReactNode } from 'react';

/**
 * Props for the ErrorBoundary component.
 *
 * @property {ReactNode} children - The child components to render.
 * @property {ReactNode} [fallback] - An optional fallback UI to display when an error occurs.
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * State for the ErrorBoundary component.
 *
 * @property {boolean} hasError - Indicates whether an error has been caught.
 */
interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * ErrorBoundary component that catches JavaScript errors in its child component tree,
 * logs those errors, and displays a fallback UI.
 *
 * @remarks
 * This is useful for preventing the entire UI from crashing when an error occurs in one part of the app.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Initialize state indicating no error has occurred
    this.state = { hasError: false };
  }

  /**
   * Update state so the next render shows the fallback UI.
   * This lifecycle method is invoked after an error has been thrown by a descendant component.
   *
   * @param _error - The error that was thrown.
   * @returns An object updating the state.
   */
  static getDerivedStateFromError(_error: unknown): ErrorBoundaryState {
    return { hasError: true };
  }

  /**
   * Logs the error and additional error information.
   *
   * @param error - The error that was thrown.
   * @param errorInfo - An object with component stack information.
   */
  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    if (error instanceof Error) {
      console.error('ErrorBoundary caught an error:', error.message, errorInfo);
    } else {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if provided, otherwise a default message
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
