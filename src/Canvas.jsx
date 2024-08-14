import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ResizableBox } from 'react-resizable';
import Modal from 'react-modal';
import 'react-resizable/css/styles.css';

const Canvas = () => {
  const [cards, setCards] = useState([
    { id: '1', text: 'This is some dummy text for card 1...', fullText: 'This is some dummy text for card 1. It has more details that are revealed on clicking show more.' },
    { id: '2', text: 'This is some dummy text for card 2...', fullText: 'This is some dummy text for card 2. It has more details that are revealed on clicking show more.' }
  ]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentText, setCurrentText] = useState('');

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCards(items);
  };

  const openModal = (text) => {
    setCurrentText(text);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className="w-full h-screen overflow-auto bg-gray-100 p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <ResizableBox
                      width={200}
                      height={200}
                      minConstraints={[150, 150]}
                      maxConstraints={[500, 500]}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="bg-white p-4 mb-4 border border-gray-300 shadow-lg rounded-lg"
                    >
                      <p className="text-center">{card.text.slice(0, 25)}...</p>
                      <button
                        onClick={() => openModal(card.fullText)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      >
                        Show More
                      </button>
                    </ResizableBox>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Card Details"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-8"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Card Details</h2>
        <p className="mb-4">{currentText}</p>
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Canvas
