# Star Wars Character App

A React application that displays detailed information about Star Wars characters using data from the [SWAPI](https://swapi.dev/) and images from the [Star Wars Databank](https://starwars-databank.vercel.app/). The app features pagination, search, filtering, detailed modal views for characters, and a mocked JWT authentication system.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Future Improvements](#future-improvements)
- [Project Structure](#project-structure)

---

## Features

- **Character List:**
  - Fetches character data from the SWAPI `/people` endpoint.
  - Implements pagination to handle large datasets.
  - Displays a loading indicator while fetching data.
  - Handles errors in case of API issues.
  - Supports search and client-side filtering by homeworld, species, and starships.

- **Character Card:**
  - Displays each character in a card with hover animations.
  - Clicking a card opens a modal with detailed character information.

- **Character Modal:**
  - Fetches the character's photo from the Star Wars Databank (with a fallback image if not found).
  - Displays character details such as name, height, mass, gender, birth year, and number of films.
  - Fetches and displays homeworld information (name, terrain, climate, population).

- **Mocked JWT Authentication:**
  - Implements login and logout functionality using hard-coded credentials.
  - Uses cookies to store the access and refresh tokens.
  - Implements token refresh logic via Axios interceptors.

- **Testing:**
  - Basic integration tests for components (e.g., CharacterModal) using React Testing Library, Jest, and jest-axe for accessibility.
  - Unit tests for critical components like CharacterCard and SearchBar.
  - Accessibility tests to verify that components do not have violations.

---

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/your-username/starwars-character-app.git
   cd starwars-character-app
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

  or

   ```
   yarn install
   ```

3. **Environment Variables:**

   Create a file `.env.local` in the root of the project and add the following variables:

   ```env
   NEXT_PUBLIC_MOCKED_ACCESS_TOKEN=mocked-access-token
   NEXT_PUBLIC_MOCKED_REFRESH_TOKEN=mocked-refresh-token
   NEXT_PUBLIC_MOCKED_NEW_ACCESS_TOKEN=mocked-new-access-token
   NODE_ENV=development
   ```

---

## Running the Application

### Development Mode

To run the project in development mode:

```
npm run dev
```

or

```
yarn dev
```

The application will start (usually at [http://localhost:3000](http://localhost:3000)).

### Production Build

To create a production build:

```
npm run build
npm start
```

or

```
yarn build
yarn start
```

---

## Running Tests

1. **Run the tests:**

   Ensure that all test dependencies are installed (Jest, React Testing Library, jest-axe, etc.), then run:

   ```
   npm run test
   ```

   or

   ```
   yarn test
   ```

2. **Accessibility Tests:**

   Accessibility tests are integrated using `jest-axe` to ensure components have no violations. They will run along with the other tests.

3. **Test Scripts Example:**

   Your `package.json` might have a script like:

   ```json
   "scripts": {
     "test": "jest --watch"
   }
   ```

---

## Future Improvements

While the current implementation meets the assignment requirements, here are some planned improvements:

- **UI & Layout Enhancements:**
  - Refine and polish the design and layout for a more responsive and visually appealing interface.
  - Enhance components like NavBar and modals with improved animations and transitions.
  - Improve accessibility by adding ARIA attributes and optimizing contrast ratios.

- **Advanced Testing:**
  - Expand unit test and integration test coverage for all critical components.
  - Implement end-to-end (E2E) tests using tools like Cypress or Playwright to simulate full user flows (login, search, filter, modal interactions).

- **Performance Optimizations:**
  - Integrate advanced caching strategies with SWR.
  - Optimize image loading (e.g., lazy loading) and reduce unnecessary re-renders.

- **Authentication & Security:**
  - Enhance the mocked JWT authentication to simulate more complex scenarios, such as token expiration and error handling.
  - In a production setup, implement secure token validation on the backend along with proper token refresh strategies.

- **CI/CD:**
  - Set up continuous integration pipelines to run tests on each commit.

---

## Project Structure

```
├── app
│   ├── api
│   │   └── auth
│   │       ├── login
│   │       │   └── route.ts
│   │       ├── logout
│   │       │   └── route.ts
│   │       └── refresh
│   │           └── route.ts
│   ├── characters
│   │   ├── components
│   │   │   ├── CharacterCard.styles.tsx
│   │   │   ├── CharacterCard.tsx
│   │   │   ├── CharacterModal.styles.tsx
│   │   │   └── CharacterModal.tsx
│   │   ├── error.tsx
│   │   └── page.tsx
│   └── login
│       ├── error.tsx
│       └── page.tsx
│   ├── error.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── page.tsx
├── components
│   ├── common
│   │   ├── ErrorBoundary.tsx
│   │   ├── ImageContainer.ts
│   │   ├── ModalBase.styles.tsx
│   │   ├── ModalBase.tsx
│   │   └── NavBar.styles.tsx
│   │   └── NavBar.tsx
│   │   └── Pagination.tsx
│   └── organisms
│       ├── SearchBar.tsx
│       └── SearchFiltersStyles.ts
├── contexts
│   └── AuthContext.tsx
├── hooks
│   ├── useCharacters.ts
│   ├── usePlanets.ts
│   ├── useSpecies.ts
│   └── useStarships.ts
├── services
│   ├── apiClient.ts
│   ├── databank.ts
│   └── swapi.ts
├── styles
│   └── global.ts
├── types
│   ├── character.ts
│   ├── planets.ts
│   ├── species.ts
│   └── starships.ts
├── utils
│   ├── cookies.ts
│   └── interfaces.ts
│   └── jwtMock.ts
├── middleware.ts
```
