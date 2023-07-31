import React from 'react';
import BookCard from '@/components/bookCard';

const HomePage = () => {
  const books: Book[] = [...Array(60)].map((_, index) => ({
    id: index,
    title: 'sample title',
    description: 'sample description',
    discountRate: 10,
    coverImg:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
    price: 200,
  }));

  return (
    <div className="h-screen flex flex-col">
      <div className="m-4 text-xl text-center font-bold">Books</div>
      <div className="flex-grow overflow-y-auto grid grid-cols-2 gap-1">
        {books.map((book: Book, index) => {
          return <BookCard key={index} book={book} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
