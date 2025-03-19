"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styled from "styled-components";
import { Spinner } from "@/components/common/ImageContainer";

/**
 * Styled Container for the login page.
 */
const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1c1c1c;
`;

/**
 * Styled Card for the login form.
 */
const Card = styled.div`
  background-color: #151515;
  color: #F4E300;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  position: relative;
`;

/**
 * Styled Title for the login card.
 */
const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
`;

/**
 * Styled Label for form inputs.
 */
const Label = styled.label`
  display: block;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

/**
 * Styled Input field.
 */
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #3b3b3b;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 1rem;
  background-color: #202022;
  color: #fff;

  ::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #F4E300;
  }
`;

/**
 * Styled Button for submission.
 */
const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #C8102E; /* Pantone 186 C */
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #F4E300; /* Pantone 107 C */
    color: #000;
  }
`;

/**
 * Styled error message.
 */
const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 1rem;
`;

/**
 * LoginPage component.
 *
 * Displays a login form with username and password fields.
 * While the API call is in progress, a spinner is shown over the card.
 * On successful login, the user is redirected to the characters page.
 *
 * @returns The login page UI.
 */
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setLoading(true); // Start loader

    try {
      const res = await axios.post(
        "/api/auth/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        setErro(res.data.message || "Error logging in");
      } else {
        router.push("/characters");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErro(
          (error.response.data as { message?: string }).message ||
            "Error logging in"
        );
      } else {
        setErro("Unexpected error");
      }
      console.error(error);
    } finally {
      setLoading(false); // Stop loader when request is finished
    }
  }

  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <div>
            <Label>Username:</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div>
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          {erro && <ErrorMessage>{erro}</ErrorMessage>}
          <Button type="submit" disabled={loading}>
            Login
          </Button>
        </form>
        {loading && <div style={{ margin: "auto", marginTop: '20px', width: "fit-content" }}>
          <Spinner /> {/* Display spinner when loading */}
        </div>}
      </Card>
    </Container>
  );
}
