import { DataItem } from "./data";

export const handleItemClick = (
    item: DataItem,
    selectedItems: DataItem[],
    setFilteredData: React.Dispatch<React.SetStateAction<DataItem[]>>,
    setSelectedItems: React.Dispatch<React.SetStateAction<DataItem[]>>,
    filteredData: DataItem[]
  ): void => {
    // add the item in the chip and remove from the list
    setSelectedItems([...selectedItems, item]);
    setFilteredData(filteredData.filter((i) => i !== item));
  };
  
  export const handleChipRemove = (
    removedItem: DataItem,
    setSelectedItems: React.Dispatch<React.SetStateAction<DataItem[]>>,
    filteredData: DataItem[],
    selectedItems: DataItem[],
    setFilteredData: React.Dispatch<React.SetStateAction<DataItem[]>>
  ): void => {
    // Remove the chip and add the item back to the list
    setSelectedItems(selectedItems.filter((item) => item !== removedItem));
    setFilteredData([...filteredData, removedItem]);
  };

  export const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    searchTerm: string,
    selectedItems: DataItem[],
    highLight: DataItem| null,
    setFilteredData:React.Dispatch<React.SetStateAction<DataItem[]>>,
    setHighlight:React.Dispatch<React.SetStateAction<DataItem | null>>,
    setSelectedItems:React.Dispatch<React.SetStateAction<DataItem[]>>,
    filteredData: DataItem[]
    
  ) => {
    if(searchTerm !== ' '){
      setHighlight(null)
    }
    if (e.key === 'Backspace' && searchTerm === '') {
        if (selectedItems.length > 0) {
            // If there is a highlighted item, remove it
            if (highLight !== null) {
                const updatedSelectedItems = selectedItems.filter(item => item !== highLight);
                setFilteredData([...filteredData, highLight]); // Add the removed item back to filteredData
                setHighlight(null); // Clear the highlight
                setSelectedItems(updatedSelectedItems);
            } else if (selectedItems.length > 0) {
                // If there is no highlight, but there are selected items,
                // highlight the last selected item
                setHighlight(selectedItems[selectedItems.length - 1]);
            } 
        }
    } 
  }