"use client";
import { createGlobalStyle } from "styled-components";

/**
 * Global styles for the application.
 *
 * This file defines global CSS rules using styled-components' createGlobalStyle.
 * It resets margins, paddings, and sets a default box-sizing, as well as applying
 * a base font family, background color, and text color.
 */
const GlobalStyle = createGlobalStyle`
  /* Reset margins, paddings, and set box-sizing to border-box for all elements */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Global body styles */
  body {
    font-family: Arial, sans-serif;
    background-color: #151515;
    color: #fff;
  }
`;

export default GlobalStyle;
