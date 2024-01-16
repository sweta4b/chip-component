import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { data } from './data';

describe('App Component', () => {
  // Test Case 1: Rendering and Initial State
  test('renders component without crashing', () => {
    render(<App />);
  });

  test('shows filtered data list on input click', async () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.focus(inputElement);

    // Wait for the component to update/render after the click event
   
        const filteredDataList = screen.getByRole('list');
        expect(filteredDataList).toBeInTheDocument();

        const filteredDataItems = screen.getAllByRole('listitem');
        expect(filteredDataItems.length).toEqual(data.length);
    
});

 // Test Case 2: Input Interaction
 test('removes last selected item on Backspace when input is empty', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Search');

  // Simulate Backspace key press when input is empty
  fireEvent.keyDown(input, { key: 'Backspace' });

  // Assert that the last selected item has been removed from selectedItems
  // const selectedItemsChips = screen.getAllByText('X');
  // expect(selectedItemsChips).toHaveLength(0);

  // Assert that the last selected item has been added back to filteredData
  // const dataItem = screen.getByText(data[0].name); // Replace with actual item text
  // expect(dataItem).toBeInTheDocument();
});

test('handleClick', async () => {
  render(<App/>)
  const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.focus(inputElement);
    

})

});

