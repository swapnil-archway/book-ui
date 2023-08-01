import { Book } from '@/models/book';
import { formatCurrency } from '@/utils/currencyFormatter';
import React from 'react';

const BookCard = ({ book }: { book: Book }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/assets/fallbackImage.jpg';
  };

  return (
    <div className="h-80 lg:h-96 flex flex-col">
      <img className="flex-grow object-cover" src={book.coverImg} alt="book image" onError={handleImageError} />
      <div className="m-2 flex flex-col">
        <div className="flex-grow">
          <h5 className="font-semibold truncate">{book.title}</h5>
        </div>
        <div className="flex flex-row justify-between items-baseline">
          <h6 className="text-red-500 font-semibold">{`${book.discountRate}%`}</h6>
          <h4 className="text-lg font-bold">{`${formatCurrency(book.price)}`}</h4>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
