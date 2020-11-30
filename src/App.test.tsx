// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';
import {
  // calcRelativeStats,
  // calcRelativeStatsV2,
  calcMax,
  calcMin,
  calcMedian
} from './Util/Util'

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('calcMax calculates corrrectly', () => {
  const mockArray = [4,12,5,1,6]
  expect(calcMax(mockArray)).toBe(12);
})

test('calcMin calculates corrrectly', () => {
  const mockArray = [4,12,5,1,6]
  expect(calcMin(mockArray)).toBe(1);
})

test('calcMedian calculates corrrectly', () => {
  const mockArrayOdd = [4,12,5,1,6];
  const mockArrayEven = [4,5,1,6]
  expect(calcMedian(mockArrayOdd)).toBe(5);
  expect(calcMedian(mockArrayEven)).toBe(4.5);
})