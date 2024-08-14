import React, { useState } from 'react';
import Draggable from 'react-draggable';

const MyCanvas = () => {
  const [inputValue, setInputValue] = useState('');
  const [cards, setCards] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddCard = () => {
    if (inputValue.trim() !== '') {
      setCards([...cards, { text: inputValue }]);
      setInputValue('');
    }
  };

  const closePopup = () => {
    setIsOpen(false);
    setSelectedCard('');
  };

  const openPopup = (card) => {
    setSelectedCard(card.text);
    setIsOpen(true);
  };

  return (
    <>
      <div className='bg-slate-600 text-center text-3xl p-2 text-white'>
        Hubnine India Private Limited's <b>Assignment</b>
      </div>
      <div className="w-full h-screen bg-gray-100 p-4 flex flex-col items-center overflow-hidden">
        <div className="mb-4 w-full max-w-md">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter text"
            className="w-full px-4 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddCard}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-b-md hover:bg-blue-700 mt-2"
          >
            Add Card
          </button>
        </div>

        <div className="w-full h-full overflow-auto relative flex flex-wrap gap-2 p-2 justify-center">
          {cards.map((card, index) => (
            <Draggable key={index} bounds="body">
              <div
                className="bg-white p-2 border border-gray-300 shadow-lg rounded-lg w-full sm:w-60 md:w-72 lg:w-80 h-32"
                style={{ resize: 'both', overflow: 'auto' }}
              >
                <p className="text-sm h-full overflow-hidden">
                  {card.text.split(' ').slice(0, 3).join(' ')}....
                  <button
                    onClick={() => openPopup(card)}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    Show More
                  </button>
                </p>
              </div>
            </Draggable>
          ))}
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-4">
              <h2 className="text-xl font-semibold mb-4">Full Content</h2>
              <p className="mb-4">{selectedCard}</p>
              <button
                onClick={closePopup}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCanvas;
