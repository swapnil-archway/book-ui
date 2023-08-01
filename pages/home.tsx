import React, { useEffect, useRef, useState } from 'react';
import BookCard from '@/components/bookCard';
import { useRecoilState } from 'recoil';
import { bookState } from '@/recoil/recoil';
import { getBooks } from '@/api/api';
import { Book, BookList, BookResponse, ListMeta } from '@/models/book';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';

const HomePage = () => {
  const [bookData, setBookData] = useRecoilState<BookList>(bookState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>('');
  const listRef = useRef<HTMLDivElement>(null);

  const fetchBooks = async (page: number): Promise<BookResponse> => {
    try {
      const meta: ListMeta = { page, limit: 10 };
      const bookResponse: BookResponse = await getBooks(meta);
      setErrMessage('');

      return bookResponse;
    } catch (error) {
      setErrMessage('Something went wrong.');
      throw error;
    }
  };

  const loadBooksData = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const bookResponse = await fetchBooks(page);

      setBookData((prevData: BookList) => ({
        ...prevData,
        books: prevData ? prevData.books.concat(bookResponse.data) : bookResponse.data,
        currentPage: page,
        total: bookResponse.total,
      }));
      setIsLoading(false);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.error(error);
      setIsLoading(false);
    }
  };

  const refreshBooksData = async (): Promise<void> => {
    try {
      const bookResponse: BookResponse = await fetchBooks(1);
      setBookData({
        books: bookResponse.data,
        currentPage: 1,
        limit: 10,
        total: bookResponse.total,
      });
    } catch (error) {
      console.error(error);
      setBookData((prevData: BookList) => prevData);
    }
  };

  const handleScroll = () => {
    const container = listRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      if (Math.round((scrollTop / (scrollHeight - clientHeight)) * 100) >= 80) {
        if (!isLoading && !isFetching && bookData.books.length < bookData.total) {
          setIsFetching(true);
          loadBooksData((bookData?.currentPage ?? 1) + 1);
        }
      }
    }
  };

  useEffect(() => {
    loadBooksData();
    return () => {};
  }, []);

  useEffect(() => {
    if (errMessage) {
      setTimeout(() => {
        setErrMessage('');
      }, 3000);
    }

    return () => {};
  }, [errMessage]);

  useEffect(() => {
    listRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      listRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [[isLoading]]);

  const isRefreshing: boolean = usePullToRefresh(listRef, refreshBooksData);

  return (
    <div className="h-screen flex flex-col">
      <div className="m-4 text-xl text-center font-bold">Books</div>
      <div className="flex-grow overflow-y-auto" ref={listRef}>
        {isRefreshing && <div className="m-4 text-lg">Refreshing...</div>}
        {bookData && bookData.books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
            {bookData &&
              bookData.books?.map((book: Book) => {
                return <BookCard key={book.id} book={book} />;
              })}
          </div>
        ) : (
          <div className="text-center">No book found</div>
        )}
      </div>

      {errMessage && (
        <div className="fixed bottom-4 right-8 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md">
          <p className="text-sm">{errMessage}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
