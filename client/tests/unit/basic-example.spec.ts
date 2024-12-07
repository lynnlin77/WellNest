/*
  Demo: test ordinary Java/TypeScript
*/

import { expect, test } from "vitest";

// all exports from main will now be available as main.X
// import * as main from '../mock/src/main';
import * as main from "../../src/main";

test("is 1 + 1 = 2?", () => {
  expect(1 + 1).toBe(2);
});

// Notice how you can test vanilla TS functions using Playwright as well!
test("main.zero() should return 0", () => {
  expect(main.zero()).toBe(0);
});

// import { render, screen } from "@testing-library/react";
// import App from "../../../../App"; // Assuming your main component is named App
// import PropertyList from "../../src/components/PropertyList"; // Example component
// import { datasets } from "../../src/data"; // Your mocked datasets

// // Test rendering of the main App component
// test("renders App component", () => {
//   render(<App />);
//   const heading = screen.getByText(/Real Estate Appraiser/i); // Adjust the text as per your header
//   expect(heading).toBeInTheDocument();
// });

// // Test rendering of the PropertyList component with mocked data
// test("renders PropertyList with mocked data", () => {
//   render(<PropertyList properties={datasets[0].data} />);
//   const propertyItem = screen.getByText(/123 Maple St/i); // Adjust to check the first property
//   expect(propertyItem).toBeInTheDocument();
// });

// // Test if a property card displays correct values
// test("displays property details correctly", () => {
//   render(<PropertyList properties={datasets[0].data} />);
//   const propertyValue = screen.getByText(/Value: \$250,000/i); // Adjust to check the value of the first property
//   expect(propertyValue).toBeInTheDocument();
// });

// // Test button click functionality (example: load more properties)
// test("loads more properties when button clicked", async () => {
//   render(<PropertyList properties={datasets[0].data} />);
//   const button = screen.getByRole('button', { name: /Load More/i }); // Adjust as per your button's name
//   await userEvent.click(button);
//   const newPropertyItem = screen.getByText(/456 Oak Ave/i); // Adjust to check a new property that should appear
//   expect(newPropertyItem).toBeInTheDocument();
// });

// // Test if a property card matches snapshot
// test("matches the snapshot for PropertyList", () => {
//   const { container } = render(<PropertyList properties={datasets[0].data} />);
//   expect(container).toMatchSnapshot();
// });

// // For more information on how to make unit tests, visit:
// // https://jestjs.io/docs/using-matchers
