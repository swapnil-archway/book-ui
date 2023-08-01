import { Book } from '@/models/book';
import { formatCurrency } from '@/utils/currencyFormatter';
import React from 'react';

const BookCard = ({ book }: { book: Book }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/assets/fallbackImage.jpg';
  };

  return (
    <div className="h-80 lg:h-96 ">
      <div className="h-[80%]">
        <img className="object-cover h-full w-full" src={book.coverImg} alt="book image" onError={handleImageError} />
      </div>
      <div className="p-2 flex flex-col h-[20%]">
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
