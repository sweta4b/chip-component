import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { data, DataItem } from './data';
import { handleChipRemove, handleInputKeyDown, handleItemClick } from './utils';

const App: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showDataList, setShowDataList] = useState(false);
  const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);
  const [highLight, setHighlight] = useState<DataItem | null>(null)
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { 
    handleInputKeyDown(e,searchTerm,selectedItems,highLight,setFilteredData,setHighlight,setSelectedItems,filteredData)
  };

   const onItemClick = (item: DataItem) => {
    handleItemClick(item, selectedItems, setFilteredData, setSelectedItems, filteredData);
  };

  const onChipRemove = (removedItem: DataItem) => {
    handleChipRemove(removedItem, setSelectedItems, filteredData, selectedItems, setFilteredData);
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
                  onClick={() => onChipRemove(item)}
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
            onKeyDown={onInputKeyDown}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {showDataList &&
            <ul className="absolute" data-testid = "filtered-data-list">
              {filteredData
                .filter((item) => searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item, index) => (
                  <li
                    key={index}
                    onClick={() => onItemClick(item)}
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







