import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ref, onValue } from "firebase/database";
import db from "./firebase"


test('can compile main page', () => {
  render(<App />);
  const linkElement = screen.getByText(/askdoc/i);
  expect(linkElement).toBeInTheDocument();
});
