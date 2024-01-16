import { render, fireEvent, screen } from '@testing-library/react';
import { DataItem } from './data';
import { handleItemClick, handleChipRemove, handleInputKeyDown } from './utils';

// Mock the React.Dispatch type
type MockDispatch<T> = jest.Mock<void, [T]>;

describe('handleItemClick', () => {
  it('should add the item to selectedItems and remove it from filteredData', () => {
    // sample data as needed
    const item: DataItem = { name: 'ExampleItem', email: 'example@email.com', profileUrl: '' };
    const selectedItems: DataItem[] = [{ name: 'PreviousItem', email: 'example@email.com', profileUrl: '' }];
    const filteredData: DataItem[] = [{ name: 'ExampleItem', email: 'example@email.com', profileUrl: '' }, { name: 'AnotherItem', email: 'example@email.com', profileUrl: '' }];
    const setFilteredData: MockDispatch<React.SetStateAction<DataItem[]>> = jest.fn();
    const setSelectedItems: MockDispatch<React.SetStateAction<DataItem[]>> = jest.fn();

    // Act
    handleItemClick(item, selectedItems, setFilteredData, setSelectedItems, filteredData);

    // Assert
    expect(setSelectedItems).toHaveBeenCalledWith([...selectedItems, item]);
    expect(setFilteredData).toHaveBeenCalledWith(filteredData.filter((i) => i !== item));
    expect(setSelectedItems).toHaveBeenCalledTimes(1); // Ensure setSelectedItems is called once
    expect(setFilteredData).toHaveBeenCalledTimes(1); // Ensure setFilteredData is called once
    expect(setFilteredData).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(item)]) // Ensure the item is removed from filtereddata
    )
  });
});

describe('handleChipRemove', () => {
  it('should remove the item from selectedItems and add it back to filteredData', () => {
    // sample data as needed
    const removedItem: DataItem = { name: 'ExampleItem', email: 'example@email.com', profileUrl: '' };
    const selectedItems: DataItem[] = [{ name: 'ExampleItem', email: 'example@email.com', profileUrl: '' }, { name: 'AnotherItem', email: 'example@email.com', profileUrl: '' }];
    const filteredData: DataItem[] = [{ name: 'PreviousItem', email: 'example@email.com', profileUrl: '' }];
    const setFilteredData: MockDispatch<React.SetStateAction<DataItem[]>> = jest.fn();
    const setSelectedItems: MockDispatch<React.SetStateAction<DataItem[]>> = jest.fn();

    // Act
    handleChipRemove(removedItem, setSelectedItems, filteredData, selectedItems, setFilteredData);

    // Assert
    expect(setSelectedItems).toHaveBeenCalledWith(selectedItems.filter((item) => item !== removedItem));
    expect(setFilteredData).toHaveBeenCalledWith([...filteredData, removedItem]);
    expect(setSelectedItems).toHaveBeenCalledTimes(1); // Ensure setSelectedItems is called once
    expect(setFilteredData).toHaveBeenCalledTimes(1); // Ensure setFilteredData is called once
    expect(setSelectedItems).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(removedItem)]) // Ensure the item is removed from selectedItems
    );

  });
});

describe('handleInputKeyDown', () => {
  it('should removes highlighted item on Backspace when searchTerm is empty', () => {
    // sample data as needed
    const searchTerm = '';
    const selectedItems = [{ name: 'Item 1', email: '', profileUrl: '' }, { name: 'Item 2', email: '', profileUrl: '' }];
    const highLight = { name: 'Item 1', email: '', profileUrl: '' };
    const setFilteredDataMock: MockDispatch<React.SetStateAction<DataItem[]>> = jest.fn();
    const setSelectedItemsMock: MockDispatch<React.SetStateAction<DataItem[]>> = jest.fn();
    const setHighlightMock: MockDispatch<React.SetStateAction<DataItem | null>> = jest.fn();
    const filteredData = [{ name: 'Item 3', email: '', profileUrl: '' }, { name: 'Item 4', email: '', profileUrl: '' }];

    // Render a component with an input element and attach the event handler
    render(
      <input
        onKeyDown={(e) =>
          handleInputKeyDown(
            e,
            searchTerm,
            selectedItems,
            highLight,
            setFilteredDataMock,
            setHighlightMock,
            setSelectedItemsMock,
            filteredData
          )
        }
      />
    );

    // Trigger Backspace key event
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Backspace' });

    // Assert the expected function calls or state changes
    expect(setSelectedItemsMock).toHaveBeenCalledWith(selectedItems.filter((item) => item !== highLight));
    expect(setFilteredDataMock).toHaveBeenCalledWith([...filteredData, highLight]);
    expect(setHighlightMock).toHaveBeenCalledWith(null);
    expect(setSelectedItemsMock).toHaveBeenCalledTimes(1); // Ensure setSelectedItemsMock is called once
    expect(setFilteredDataMock).toHaveBeenCalledTimes(1); // Ensure setFilteredDataMock is called once
    expect(setSelectedItemsMock).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(highLight)]), // Ensure the highlighted item is removed from selectedItems
    );
    expect(setFilteredDataMock).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(highLight)]) // Ensure the highlighted item is added back to filteredData
    );
  });
})





