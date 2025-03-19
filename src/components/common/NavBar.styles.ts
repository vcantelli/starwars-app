import Link from 'next/link';
import styled from 'styled-components';

/**
 * Nav component styling.
 */
export const Nav = styled.nav`
  padding: 1rem 2rem;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/**
 * Container for navigation links.
 */
export const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

/**
 * StyledLink component.
 *
 * A styled version of the Next.js Link for consistent navigation styling.
 */
export const StyledLink = styled(Link)`
  color: #F4E300;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #C8102E;
  }
`;

/**
 * LogoutButton component.
 *
 * A styled button for logging out, matching the theme of the navigation.
 */
export const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: #F4E300;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #C8102E;
  }
`;