import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { data, DataItem } from './data';



const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showDataList, setShowDataList] = useState(false);
  const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);
  const [highLight, setHighlight] = useState<DataItem | null>(null)
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    
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
  };

   const handleItemClick = (item: DataItem) => {
    setSelectedItems([...selectedItems, item]);
    setFilteredData(filteredData.filter((i) => i !== item));
    setShowDataList(false)
  };

  const handleChipRemove = (removedItem: DataItem) => {
    setSelectedItems(selectedItems.filter((item) => item !== removedItem));
    setFilteredData([...filteredData, removedItem]);
    setShowDataList(false)
  };

  const handleInputFocus = () => {
    setShowDataList(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        // Click occurred outside the input and data list, hide the data list
        setShowDataList(false);
      }
    };

    // Add global click event listener
    document.addEventListener('click', handleOutsideClick);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="container mx-auto mt-8 ">
      <div className='flex flex-wrap gap-4 p-4 border-b-2 border-blue-700 '>
        {selectedItems.length !== 0 && (
          <ul  data-testid="custom" className='flex flex-wrap items-start gap-4 '>
            {selectedItems.map((item, index) => (
              <li key={index} className={`flex gap-2 items-center bg-gray-100 rounded-full ${highLight === item ? 'highlighted-chip' : 'normal-chip'}`}
              >
                <img src={item.profileUrl} alt='user profile' className='bg-blue-100 w-10 h-10 rounded-full' />
                <p >{item.name}</p>
                <span
                  onClick={() => handleChipRemove(item)}
                  className="cursor-pointer  rounded-full h-5 w-5 flex items-center justify-center font-bold"
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className='' ref={inputRef}>
          <input
            className='p-2 rounded  border-none focus:outline-none'
            type="text"
            placeholder="Search"
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {showDataList &&
            <ul className="absolute" data-testid = "filtered-data-list">
              {filteredData
                .filter((item) => searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className="cursor-pointer flex gap-2 items-center bg-gray-100 hover:bg-gray-200 w-full p-2  "
                  >
                    <img src={item.profileUrl} alt='user profile' className='bg-blue-100 w-10 h-10 rounded-full' />
                    <p className='text-gray-500'>{item.name}</p>
                    <p >{item.email}</p>
                  </li>
                ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
};

export default App;







