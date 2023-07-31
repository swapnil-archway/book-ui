import React from 'react';

const BookCard = ({ book }: { book: Book }) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="h-80 flex flex-col">
      <img className="flex-grow object-cover" src={book.coverImg} alt="book image" />
      <div className="m-2 flex flex-col">
        <div className="flex-grow">
          <h4 className="truncate">{book.title}</h4>
        </div>
        <div className="flex flex-row justify-between">
          <h6>{`${book.discountRate}%`}</h6>
          <h6 className='text-lg font-bold'>{`${currencyFormatter.format(book.price)}`}</h6>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
