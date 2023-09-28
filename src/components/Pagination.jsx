import React, { useState, useEffect } from 'react';

const Pagination = ({ data }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedCards, setDisplayedCards] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Calculate the start and end indices for the currently displayed cards.
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Slice the data array to get the cards for the current page.
      const currentCards = data.slice(startIndex, endIndex);

      setDisplayedCards(currentCards);
    }
  }, [data, currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRemoveCard = (cardId) => {
    // Filter out the card with the specified cardId from the displayedCards.
    const updatedCards = displayedCards.filter((card) => card.id !== cardId);
    setDisplayedCards(updatedCards);
  };

  return (
    <div className="pagination">
      <div className="cards">
        {displayedCards.map((card) => (
          <div key={card.id} className="card">
            <span
              className="remove-card"
              onClick={() => handleRemoveCard(card.id)}
            >
              &#10060; {/* Red cross icon */}
            </span>
            <p>{card.title}</p>
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!data || currentPage * itemsPerPage >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
