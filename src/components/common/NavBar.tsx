"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LogoutButton, Nav, NavLinks, StyledLink } from "./NavBar.styles";

/**
 * NavBar component.
 *
 * This component renders the navigation bar. It prevents rendering during hydration
 * and hides the NavBar on the login page.
 *
 * @returns The navigation bar UI.
 */
export default function NavBar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  // Set mounted to true after the component mounts (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Do not render NavBar during hydration or on the login page
  if (!mounted || pathname === "/login") {
    return null;
  }

  return (
    <Nav>
      <NavLinks>
        <StyledLink href="/">Home</StyledLink>
        <StyledLink href="/characters">Characters</StyledLink>
      </NavLinks>
      <div>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </div>
    </Nav>
  );
}
